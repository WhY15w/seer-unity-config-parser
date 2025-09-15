import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import PQueue from "p-queue";
import cliProgress from "cli-progress";
import { DownloadParams, DownloadMethod } from "./types";

export default class Downloader {
  private client: AxiosInstance;
  private semaphore: PQueue;

  constructor(clientConfig?: AxiosRequestConfig, limit: number = 10) {
    this.client = axios.create(clientConfig);
    this.semaphore = new PQueue({ concurrency: limit });
  }

  private async getFileSize(url: string): Promise<number> {
    try {
      const response = await this.client.head(url);
      return parseInt(response.headers["content-length"] || "0", 10);
    } catch {
      return 0;
    }
  }

  private async getStreamData(
    url: string,
    method: DownloadMethod = "GET",
    md5?: string,
    progressCallback?: (progress: number) => void
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.client({ url, method, responseType: "stream" })
        .then((res) => {
          const total = parseInt(res.headers["content-length"] || "0", 10);
          let downloaded = 0;
          let buf = Buffer.alloc(0);
          res.data.on("data", (chunk: Buffer) => {
            buf = Buffer.concat([buf, chunk]);
            downloaded += chunk.length;
            if (progressCallback && total > 0) {
              progressCallback(downloaded / total);
            }
          });
          res.data.on("end", () => {
            if (md5) {
              const hash = crypto.createHash("md5").update(buf).digest("hex");
              if (hash !== md5.toLowerCase()) {
                return reject(new Error(`MD5 check failed for ${url}`));
              }
            }
            resolve(buf);
          });
          res.data.on("error", reject);
        })
        .catch(reject);
    });
  }

  async download(
    params: DownloadParams,
    postprocess?: (data: Buffer) => Buffer,
    semaphore?: PQueue
  ) {
    const queue = semaphore || this.semaphore;
    return queue.add(async () => {
      const { url, filename, method = "GET", md5 } = params;
      const urlStr = typeof url === "string" ? url : url.toString();

      const dir = path.dirname(filename);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const totalSize = await this.getFileSize(urlStr);
      const progressBar = new cliProgress.SingleBar(
        { format: `${path.basename(filename)} | {bar} | {percentage}%` },
        cliProgress.Presets.shades_classic
      );
      progressBar.start(totalSize, 0);

      try {
        const data = await this.getStreamData(urlStr, method, md5, (p) =>
          progressBar.update(Math.round(p * totalSize))
        );
        fs.writeFileSync(filename, postprocess ? postprocess(data) : data);
        progressBar.update(totalSize);
      } finally {
        progressBar.stop();
      }
    });
  }

  async downloads(
    params: DownloadParams[],
    postprocess?: (data: Buffer) => Buffer,
    semaphore?: PQueue
  ) {
    const totalBar = new cliProgress.SingleBar(
      { format: `总进度 | {bar} | {percentage}% | {value}/{total} 文件` },
      cliProgress.Presets.shades_classic
    );
    totalBar.start(params.length, 0);
    const queue = semaphore || this.semaphore;
    let done = 0;

    await Promise.all(
      params.map((p) =>
        this.download(p, postprocess, queue).then(() => {
          done++;
          totalBar.update(done);
        })
      )
    );
    totalBar.stop();
  }
}

import PQueue from "p-queue";
import Downloader from "./Downloader";
import YooVersionManager from "./YooVersionManager";
import { DownloadParams } from "./types";

export default class Updater {
  constructor(
    private name: string,
    private desc: string,
    private versionManager: YooVersionManager,
    private downloader: Downloader,
    private postprocess?: (data: Buffer) => Buffer
  ) {}

  private log(msg: string) {
    console.log(`更新器[${this.name}]: ${msg}`);
  }

  async update(semaphoreLimit?: number) {
    this.log("检查更新...");
    const manifest = await this.versionManager.generateUpdateManifest();
    if (!manifest) return this.log("没有需要更新的文件");
    this.log(`需要更新文件数量: ${manifest.items.size}`);

    const tasks: DownloadParams[] = Array.from(manifest.items).map(
      ([fn, item]) => ({
        url: item.remoteFilename,
        filename: fn,
        md5: item.fileHash,
      })
    );

    const semaphore = semaphoreLimit
      ? new PQueue({ concurrency: semaphoreLimit })
      : undefined;

    await this.downloader.downloads(tasks, this.postprocess, semaphore);
    this.versionManager.saveManifestToLocal(manifest);
    this.log("更新完成");
  }

  async getVersionInfo() {
    return {
      local: this.versionManager.loadLocalVersion(),
      remote: await this.versionManager.getRemoteVersion(),
    };
  }
}

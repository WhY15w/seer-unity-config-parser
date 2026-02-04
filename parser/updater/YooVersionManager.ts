import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { Manifest, ManifestItem, PackageManifest } from "./types";
import YooManifestParser from "./YooManifestParser";

export default class YooVersionManager {
  constructor(
    private packageName: string,
    private remotePath: string,
    private localPath: string,
    private manifestFactory: (
      data: Buffer
    ) => PackageManifest = new YooManifestParser().parseManifest.bind(
      new YooManifestParser()
    )
  ) {}

  private get manifestFilePath() {
    return path.join(
      this.localPath,
      `PackageManifest_${this.packageName}.json`
    );
  }
  private get versionFileName() {
    return `PackageManifest_${this.packageName}.version?t=${Date.now()}`;
  }

  async getRemoteVersion(): Promise<string> {
    const url = new URL(this.versionFileName, this.remotePath).href;
    const res = await axios.get(url);
    return res.data;
  }

  loadLocalVersion(): string {
    if (!fs.existsSync(this.manifestFilePath)) return "0";
    const m = this.loadLocalManifest();
    return m.version;
  }

  async getRemoteManifest(): Promise<Manifest> {
    const version = await this.getRemoteVersion();
    const bytesUrl = new URL(
      `PackageManifest_${this.packageName}_${version}.bytes`,
      this.remotePath
    ).href;
    const res = await axios.get(bytesUrl, { responseType: "arraybuffer" });
    return this.simplifyManifest(this.manifestFactory(Buffer.from(res.data)));
  }

  loadLocalManifest(): Manifest {
    if (!fs.existsSync(this.manifestFilePath))
      return { version: "0", items: new Map() };
    const parsed = JSON.parse(fs.readFileSync(this.manifestFilePath, "utf8"));
    const items = new Map<string, ManifestItem>();
    for (const [k, v] of Object.entries(parsed.items))
      items.set(k, v as ManifestItem);
    return { version: parsed.version, items };
  }

  saveManifestToLocal(manifest: Manifest) {
    const dir = path.dirname(this.manifestFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const serializable = {
      version: manifest.version,
      items: Object.fromEntries(manifest.items),
    };
    fs.writeFileSync(
      this.manifestFilePath,
      JSON.stringify(serializable, null, 2)
    );
  }

  async generateUpdateManifest(): Promise<Manifest | null> {
    const remote = await this.getRemoteManifest();
    const local = this.loadLocalManifest();
    const updateItems = new Map<string, ManifestItem>();
    for (const [k, r] of remote.items) {
      const l = local.items.get(k);
      if (!l || l.fileHash !== r.fileHash) updateItems.set(k, r);
    }
    return updateItems.size > 0
      ? { version: remote.version, items: updateItems }
      : null;
  }

  private simplifyManifest(data: PackageManifest): Manifest {
    const items = new Map<string, ManifestItem>();
    for (const b of data.BundleList) {
      const localFn = path.join(this.localPath, b.BundleName);
      items.set(localFn, {
        remoteFilename: new URL(b.FileHash, this.remotePath).href,
        localBasename: `${b.BundleName}.bundle`,
        fileHash: b.FileHash,
      });
    }
    return { version: data.PackageVersion, items };
  }
}

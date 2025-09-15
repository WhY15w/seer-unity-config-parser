import { BytesReader, LengthType } from "../../utils/BytesReader";
import { PackageManifest, PackageAssetInfo, PackageBundleInfo } from "./types";

export default class YooManifestParser {
  parseManifest(buf: Buffer): PackageManifest {
    const r = new BytesReader(new Uint8Array(buf), {
      lengthType: LengthType.Uint16,
      littleEndian: true,
    });
    r.uint(); // skip
    const version = r.text();
    const manifest: PackageManifest = {
      FileVersion: version,
      EnableAddressable: r.boolean(),
      LocationToLower: r.boolean(),
      IncludeAssetGUID: r.boolean(),
      OutputNameType: r.int(),
      PackageName: r.text(),
      PackageVersion: r.text(),
      PackageAssetCount: 0,
      PackageAssetInfos: [],
      PackageBundleCount: 0,
      BundleList: [],
    };
    manifest.PackageAssetCount = r.int();
    manifest.PackageAssetInfos = this.parseAssets(
      r,
      manifest.PackageAssetCount
    );
    manifest.PackageBundleCount = r.int();
    manifest.BundleList = this.parseBundles(r, manifest.PackageBundleCount);
    return manifest;
  }

  private parseAssets(r: BytesReader, count: number): PackageAssetInfo[] {
    const arr: PackageAssetInfo[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        AssetPath: r.text(),
        BundleID: r.int(),
        DependIDs: new Array(r.ushort()).fill(null).map(() => r.int()),
      });
    }
    return arr;
  }

  private parseBundles(r: BytesReader, count: number): PackageBundleInfo[] {
    const arr: PackageBundleInfo[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        BundleName: r.text(),
        UnityCRC: r.uint(),
        FileHash: r.text(),
        FileCRC: r.text(),
        FileSize: r.long(),
        IsRawFile: r.boolean(),
        LoadMethod: r.byte(),
        ReferenceIDs: new Array(r.ushort()).fill(null).map(() => r.int()),
      });
    }
    return arr;
  }
}

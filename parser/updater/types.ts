export type URLTypes = string | URL;
export type DownloadMethod = "GET" | "POST";

export interface DownloadParams {
  url: URLTypes;
  filename: string;
  method?: DownloadMethod;
  md5?: string;
}

export interface ManifestItem {
  remoteFilename: string;
  localBasename: string;
  fileHash: string;
}

export interface Manifest {
  version: string;
  items: Map<string, ManifestItem>;
}

export interface PackageAssetInfo {
  AssetPath: string;
  BundleID: number;
  DependIDs: number[];
}

export interface PackageBundleInfo {
  BundleName: string;
  UnityCRC: number | null;
  FileHash: string;
  FileCRC: string;
  FileSize: number;
  IsRawFile: boolean;
  LoadMethod: number;
  ReferenceIDs: number[];
}

export interface PackageManifest {
  FileVersion: string;
  EnableAddressable: boolean;
  LocationToLower: boolean;
  IncludeAssetGUID: boolean;
  OutputNameType: number;
  PackageName: string;
  PackageVersion: string;
  PackageAssetCount: number;
  PackageAssetInfos: PackageAssetInfo[];
  PackageBundleCount: number;
  BundleList: PackageBundleInfo[];
}

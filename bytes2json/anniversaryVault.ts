import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAnniversaryVaultInfo {
  commodity: string;
  id: number;
  mintmarkNum: number;
  needID: number;
  needNum: number;
  needtype: number;
  page: number;
  petinfo: string;
  price: number;
  quantity: number;
  tab: number;
  unique: number;
  userInfoId: number;
}

export interface AnniversaryVaultConfig {
  data?: IAnniversaryVaultInfo[];
}

const anniversaryVaultInfoSchema: FieldSchema = [
  ["commodity", text()],
  ["id", int()],
  ["mintmarkNum", int()],
  ["needID", int()],
  ["needNum", int()],
  ["needtype", int()],
  ["page", int()],
  ["petinfo", text()],
  ["price", int()],
  ["quantity", int()],
  ["tab", int()],
  ["unique", int()],
  ["userInfoId", int()],
];

export const parseAnniversaryVaultConfig = createSimpleListParser<IAnniversaryVaultInfo, AnniversaryVaultConfig>({
  name: "AnniversaryVault",
  outputPath: "./json/AnniversaryVault.json",
  dataKey: "data",
  itemSchema: anniversaryVaultInfoSchema,
});

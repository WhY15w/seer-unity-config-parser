import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraLevelInfo {
  banPet: string;
  bossID: string;
  condition: string;
  firstAward: string;
  id: number;
  levelName: string;
  type: number;
}

export interface AdAstraLevelConfig {
  data?: IAdAstraLevelInfo[];
}

const adAstraLevelInfoSchema: FieldSchema = [
  ["banPet", text()],
  ["bossID", text()],
  ["condition", text()],
  ["firstAward", text()],
  ["id", int()],
  ["levelName", text()],
  ["type", int()],
];

export const parseAdAstraLevelConfig = createSimpleListParser<IAdAstraLevelInfo, AdAstraLevelConfig>({
  name: "AdAstraLevel",
  outputPath: "./json/AdAstraLevel.json",
  dataKey: "data",
  itemSchema: adAstraLevelInfoSchema,
});

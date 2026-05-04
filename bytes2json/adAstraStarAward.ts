import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraStarAwardInfo {
  id: number;
  progress: number;
  progressAward: string;
  star: number;
}

export interface AdAstraStarAwardConfig {
  data?: IAdAstraStarAwardInfo[];
}

const adAstraStarAwardInfoSchema: FieldSchema = [
  ["id", int()],
  ["progress", int()],
  ["progressAward", text()],
  ["star", int()],
];

export const parseAdAstraStarAwardConfig = createSimpleListParser<IAdAstraStarAwardInfo, AdAstraStarAwardConfig>({
  name: "AdAstraStarAward",
  outputPath: "./json/AdAstraStarAward.json",
  dataKey: "data",
  itemSchema: adAstraStarAwardInfoSchema,
});

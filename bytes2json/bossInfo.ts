import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBossInfoInfo {
  id: number;
  level: number;
  move: string;
  petID: number;
  se: string;
}

export interface BossInfoConfig {
  data?: IBossInfoInfo[];
}

const bossInfoInfoSchema: FieldSchema = [
  ["id", int()],
  ["level", int()],
  ["move", text()],
  ["petID", int()],
  ["se", text()],
];

export const parseBossInfoConfig = createSimpleListParser<IBossInfoInfo, BossInfoConfig>({
  name: "bossInfo",
  outputPath: "./json/bossInfo.json",
  dataKey: "data",
  itemSchema: bossInfoInfoSchema,
});

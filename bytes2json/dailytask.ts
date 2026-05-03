import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDailytaskInfo {
  describe: string;
  id: number;
  rewardinfo: string;
  target: number;
  time: number;
  title: string;
  value: string;
}

export interface DailytaskConfig {
  data?: IDailytaskInfo[];
}

const dailytaskInfoSchema: FieldSchema = [
  ["describe", text()],
  ["id", int()],
  ["rewardinfo", text()],
  ["target", int()],
  ["time", int()],
  ["title", text()],
  ["value", text()],
];

export const parseDailytaskConfig = createSimpleListParser<IDailytaskInfo, DailytaskConfig>({
  name: "dailytask",
  outputPath: "./json/dailytask.json",
  dataKey: "data",
  itemSchema: dailytaskInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDailytaskGiftInfo {
  NewStatLog: number;
  activity: number;
  diamond: number;
  icon: number;
  id: number;
  name: string;
  rewardinfo: string;
  type: number;
}

export interface DailytaskGiftConfig {
  data?: IDailytaskGiftInfo[];
}

const dailytaskGiftInfoSchema: FieldSchema = [
  ["NewStatLog", int()],
  ["activity", int()],
  ["diamond", int()],
  ["icon", int()],
  ["id", int()],
  ["name", text()],
  ["rewardinfo", text()],
  ["type", int()],
];

export const parseDailytaskGiftConfig = createSimpleListParser<IDailytaskGiftInfo, DailytaskGiftConfig>({
  name: "dailytask_gift",
  outputPath: "./json/dailytask_gift.json",
  dataKey: "data",
  itemSchema: dailytaskGiftInfoSchema,
});

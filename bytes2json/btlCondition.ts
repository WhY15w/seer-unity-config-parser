import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBtlConditionInfo {
  baseconid: number;
  btldesc: string;
  id: number;
  sendNumber: number;
}

export interface BtlConditionConfig {
  data?: IBtlConditionInfo[];
}

const btlConditionInfoSchema: FieldSchema = [
  ["baseconid", int()],
  ["btldesc", text()],
  ["id", int()],
  ["sendNumber", int()],
];

export const parseBtlConditionConfig = createSimpleListParser<IBtlConditionInfo, BtlConditionConfig>({
  name: "btl_condition",
  outputPath: "./json/btl_condition.json",
  dataKey: "data",
  itemSchema: btlConditionInfoSchema,
});

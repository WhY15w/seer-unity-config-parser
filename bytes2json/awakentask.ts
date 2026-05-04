import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakentaskInfo {
  NewStatLog: number;
  des: string;
  finishrecordinfo: string;
  id: number;
  limitrewardinfo: string;
  rewardinfo: string;
  taskparam: string;
  tasktype: number;
  value: number;
}

export interface AwakentaskConfig {
  data?: IAwakentaskInfo[];
}

const awakentaskInfoSchema: FieldSchema = [
  ["NewStatLog", int()],
  ["des", text()],
  ["finishrecordinfo", text()],
  ["id", int()],
  ["limitrewardinfo", text()],
  ["rewardinfo", text()],
  ["taskparam", text()],
  ["tasktype", int()],
  ["value", int()],
];

export const parseAwakentaskConfig = createSimpleListParser<IAwakentaskInfo, AwakentaskConfig>({
  name: "awakentask",
  outputPath: "./json/awakentask.json",
  dataKey: "data",
  itemSchema: awakentaskInfoSchema,
});

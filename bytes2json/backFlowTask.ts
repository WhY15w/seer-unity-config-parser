import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBackFlowTaskInfo {
  H5addition?: string[];
  H5jump?: number[];
  NewMsglogId: string;
  describe: string;
  id: number;
  init: number;
  num: number;
  rewardinfo?: number[];
  taskparam: string;
  tasktype: number;
  time: number;
  time2: string;
  title: string;
  value: string;
}

export interface BackFlowTaskConfig {
  data?: IBackFlowTaskInfo[];
}

const backFlowTaskInfoSchema: FieldSchema = [
  ["H5addition", optionalArray("text")],
  ["H5jump", optionalArray("int")],
  ["NewMsglogId", text()],
  ["describe", text()],
  ["id", int()],
  ["init", int()],
  ["num", int()],
  ["rewardinfo", optionalArray("int")],
  ["taskparam", text()],
  ["tasktype", int()],
  ["time", int()],
  ["time2", text()],
  ["title", text()],
  ["value", text()],
];

export const parseBackFlowTaskConfig = createSimpleListParser<IBackFlowTaskInfo, BackFlowTaskConfig>({
  name: "BackFlowTask",
  outputPath: "./json/BackFlowTask.json",
  dataKey: "data",
  itemSchema: backFlowTaskInfoSchema,
});

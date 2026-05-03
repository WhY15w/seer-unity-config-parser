import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBraveTaskInfo {
  group: number;
  id: number;
  jump?: number[];
  rewardinfo?: number[];
  taskparam?: number[];
  tasktype: number;
  title: string;
}

export interface BraveTaskConfig {
  data?: IBraveTaskInfo[];
}

const braveTaskInfoSchema: FieldSchema = [
  ["group", int()],
  ["id", int()],
  ["jump", optionalArray("int")],
  ["rewardinfo", optionalArray("int")],
  ["taskparam", optionalArray("int")],
  ["tasktype", int()],
  ["title", text()],
];

export const parseBraveTaskConfig = createSimpleListParser<IBraveTaskInfo, BraveTaskConfig>({
  name: "brave_task",
  outputPath: "./json/brave_task.json",
  dataKey: "data",
  itemSchema: braveTaskInfoSchema,
});

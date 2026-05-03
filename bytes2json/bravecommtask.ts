import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBravecommtaskInfo {
  NewMsglogId: string;
  group: number;
  id: number;
  init: number;
  jump: string;
  num: number;
  rewardinfo: string;
  taskparam: string;
  tasktype: number;
  title: string;
  value: string;
}

export interface BravecommtaskConfig {
  data?: IBravecommtaskInfo[];
}

const bravecommtaskInfoSchema: FieldSchema = [
  ["NewMsglogId", text()],
  ["group", int()],
  ["id", int()],
  ["init", int()],
  ["jump", text()],
  ["num", int()],
  ["rewardinfo", text()],
  ["taskparam", text()],
  ["tasktype", int()],
  ["title", text()],
  ["value", text()],
];

export const parseBravecommtaskConfig = createSimpleListParser<IBravecommtaskInfo, BravecommtaskConfig>({
  name: "Bravecommtask",
  outputPath: "./json/Bravecommtask.json",
  dataKey: "data",
  itemSchema: bravecommtaskInfoSchema,
});

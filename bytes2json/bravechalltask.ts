import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBravechalltaskInfo {
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

export interface BravechalltaskConfig {
  data?: IBravechalltaskInfo[];
}

const bravechalltaskInfoSchema: FieldSchema = [
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

export const parseBravechalltaskConfig = createSimpleListParser<IBravechalltaskInfo, BravechalltaskConfig>({
  name: "Bravechalltask",
  outputPath: "./json/Bravechalltask.json",
  dataKey: "data",
  itemSchema: bravechalltaskInfoSchema,
});

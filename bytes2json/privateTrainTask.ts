import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPrivateTrainTaskInfo {
  group: number;
  id: number;
  jump: number;
  rewardinfo: string;
  title: string;
  value: number;
}

export interface PrivateTrainTaskConfig {
  data?: IPrivateTrainTaskInfo[];
}

const privateTrainTaskInfoSchema: FieldSchema = [
  ["group", int()],
  ["id", int()],
  ["jump", int()],
  ["rewardinfo", text()],
  ["title", text()],
  ["value", int()],
];

export const parsePrivateTrainTaskConfig = createSimpleListParser<IPrivateTrainTaskInfo, PrivateTrainTaskConfig>({
  name: "privateTrainTask",
  outputPath: "./json/privateTrainTask.json",
  dataKey: "data",
  itemSchema: privateTrainTaskInfoSchema,
});

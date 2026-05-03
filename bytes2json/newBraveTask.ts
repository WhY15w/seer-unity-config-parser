import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewBraveTaskInfo {
  id: number;
  jump?: number[];
  pethead: number;
  petreward?: number[];
  rewardinfo?: number[];
  title: string;
}

export interface NewBraveTaskConfig {
  data?: INewBraveTaskInfo[];
}

const newBraveTaskInfoSchema: FieldSchema = [
  ["id", int()],
  ["jump", optionalArray("int")],
  ["pethead", int()],
  ["petreward", optionalArray("int")],
  ["rewardinfo", optionalArray("int")],
  ["title", text()],
];

export const parseNewBraveTaskConfig = createSimpleListParser<INewBraveTaskInfo, NewBraveTaskConfig>({
  name: "newBraveTask",
  outputPath: "./json/newBraveTask.json",
  dataKey: "data",
  itemSchema: newBraveTaskInfoSchema,
});

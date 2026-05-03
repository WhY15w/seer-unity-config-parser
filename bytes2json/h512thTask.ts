import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IH512thTaskInfo {
  IsDailyTask: number;
  Taskdescription: string;
  Taskschedule: number;
  Tasktags: string;
  Tasktype: number;
  UserInfo: number;
  id: number;
  rewardcnt: string;
  rewardid: string;
  rewardtype: string;
}

export interface H512thTaskConfig {
  data?: IH512thTaskInfo[];
}

const h512thTaskInfoSchema: FieldSchema = [
  ["IsDailyTask", int()],
  ["Taskdescription", text()],
  ["Taskschedule", int()],
  ["Tasktags", text()],
  ["Tasktype", int()],
  ["UserInfo", int()],
  ["id", int()],
  ["rewardcnt", text()],
  ["rewardid", text()],
  ["rewardtype", text()],
];

export const parseH512thTaskConfig = createSimpleListParser<IH512thTaskInfo, H512thTaskConfig>({
  name: "h5_12th_task",
  outputPath: "./json/h5_12th_task.json",
  dataKey: "data",
  itemSchema: h512thTaskInfoSchema,
});

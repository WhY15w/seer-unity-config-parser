import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDiamonTaskInfo {
  H5go: string;
  Rewardcnt: string;
  Rewardid: string;
  Rewardtype: string;
  Taskdescription: string;
  Taskschedule: number;
  Tasktags: string;
  Tasktype: number;
  id: number;
}

export interface DiamonTaskConfig {
  data?: IDiamonTaskInfo[];
}

const diamonTaskInfoSchema: FieldSchema = [
  ["H5go", text()],
  ["Rewardcnt", text()],
  ["Rewardid", text()],
  ["Rewardtype", text()],
  ["Taskdescription", text()],
  ["Taskschedule", int()],
  ["Tasktags", text()],
  ["Tasktype", int()],
  ["id", int()],
];

export const parseDiamonTaskConfig = createSimpleListParser<IDiamonTaskInfo, DiamonTaskConfig>({
  name: "diamon_task",
  outputPath: "./json/diamon_task.json",
  dataKey: "data",
  itemSchema: diamonTaskInfoSchema,
});

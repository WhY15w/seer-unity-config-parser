import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActivityTaskConfigInfo {
  activityid: number;
  describe: string;
  id: number;
  rewardinfo: string;
  tasksubtype: number;
  time: number;
  timeend: string;
  timelimit: string;
  timestart: string;
  title: string;
  userbitbuf: number;
  userbitbuf2: string;
  userinfo: number;
  value: number;
}

export interface ActivityTaskConfigConfig {
  data?: IActivityTaskConfigInfo[];
}

const activityTaskConfigInfoSchema: FieldSchema = [
  ["activityid", int()],
  ["describe", text()],
  ["id", int()],
  ["rewardinfo", text()],
  ["tasksubtype", int()],
  ["time", int()],
  ["timeend", text()],
  ["timelimit", text()],
  ["timestart", text()],
  ["title", text()],
  ["userbitbuf", int()],
  ["userbitbuf2", text()],
  ["userinfo", int()],
  ["value", int()],
];

export const parseActivityTaskConfigConfig = createSimpleListParser<IActivityTaskConfigInfo, ActivityTaskConfigConfig>({
  name: "Activity_TaskConfig",
  outputPath: "./json/Activity_TaskConfig.json",
  dataKey: "data",
  itemSchema: activityTaskConfigInfoSchema,
});

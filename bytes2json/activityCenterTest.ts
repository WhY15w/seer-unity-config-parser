import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActivityCenterTestInfo {
  Go: number;
  args: string;
  beginning: string;
  channel: number;
  ending: string;
  helptips: number;
  iOSreviewshow: number;
  id: number;
  isShow: number;
  labelName: string;
  name: string;
  redbadge: number;
  signType: number;
  sorting: number;
  statLog: string;
  type: number;
}

export interface ActivityCenterTestConfig {
  data?: IActivityCenterTestInfo[];
}

const activityCenterTestInfoSchema: FieldSchema = [
  ["Go", int()],
  ["args", text()],
  ["beginning", text()],
  ["channel", int()],
  ["ending", text()],
  ["helptips", int()],
  ["iOSreviewshow", int()],
  ["id", int()],
  ["isShow", int()],
  ["labelName", text()],
  ["name", text()],
  ["redbadge", int()],
  ["signType", int()],
  ["sorting", int()],
  ["statLog", text()],
  ["type", int()],
];

export const parseActivityCenterTestConfig = createSimpleListParser<IActivityCenterTestInfo, ActivityCenterTestConfig>({
  name: "ActivityCenter_test",
  outputPath: "./json/ActivityCenter_test.json",
  dataKey: "data",
  itemSchema: activityCenterTestInfoSchema,
});

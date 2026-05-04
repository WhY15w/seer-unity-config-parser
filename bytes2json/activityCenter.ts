import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActivityCenterInfo {
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
  type: number;
}

export interface ActivityCenterConfig {
  data?: IActivityCenterInfo[];
}

const activityCenterInfoSchema: FieldSchema = [
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
  ["type", int()],
];

export const parseActivityCenterConfig = createSimpleListParser<IActivityCenterInfo, ActivityCenterConfig>({
  name: "ActivityCenter",
  outputPath: "./json/ActivityCenter.json",
  dataKey: "data",
  itemSchema: activityCenterInfoSchema,
});

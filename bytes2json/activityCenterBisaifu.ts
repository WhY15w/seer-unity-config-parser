import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActivityCenterBisaifuInfo {
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

export interface ActivityCenterBisaifuConfig {
  data?: IActivityCenterBisaifuInfo[];
}

const activityCenterBisaifuInfoSchema: FieldSchema = [
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

export const parseActivityCenterBisaifuConfig = createSimpleListParser<IActivityCenterBisaifuInfo, ActivityCenterBisaifuConfig>({
  name: "ActivityCenter_bisaifu",
  outputPath: "./json/ActivityCenter_bisaifu.json",
  dataKey: "data",
  itemSchema: activityCenterBisaifuInfoSchema,
});

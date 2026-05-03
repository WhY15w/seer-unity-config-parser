import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IH512thBoxInfo {
  activitynum: number;
  exchangecut: number;
  id: number;
  rewardcnt: string;
  rewardid: string;
  rewardpr: string;
  rewardtype: string;
}

export interface H512thBoxConfig {
  data?: IH512thBoxInfo[];
}

const h512thBoxInfoSchema: FieldSchema = [
  ["activitynum", int()],
  ["exchangecut", int()],
  ["id", int()],
  ["rewardcnt", text()],
  ["rewardid", text()],
  ["rewardpr", text()],
  ["rewardtype", text()],
];

export const parseH512thBoxConfig = createSimpleListParser<IH512thBoxInfo, H512thBoxConfig>({
  name: "h5_12th_box",
  outputPath: "./json/h5_12th_box.json",
  dataKey: "data",
  itemSchema: h512thBoxInfoSchema,
});

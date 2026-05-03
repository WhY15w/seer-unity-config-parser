import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDiamonBoxInfo {
  activitynum: number;
  exchangecut: number;
  id: number;
  rewardcnt: string;
  rewardid: string;
  rewardpr: string;
  rewardtype: string;
}

export interface DiamonBoxConfig {
  data?: IDiamonBoxInfo[];
}

const diamonBoxInfoSchema: FieldSchema = [
  ["activitynum", int()],
  ["exchangecut", int()],
  ["id", int()],
  ["rewardcnt", text()],
  ["rewardid", text()],
  ["rewardpr", text()],
  ["rewardtype", text()],
];

export const parseDiamonBoxConfig = createSimpleListParser<IDiamonBoxInfo, DiamonBoxConfig>({
  name: "diamon_box",
  outputPath: "./json/diamon_box.json",
  dataKey: "data",
  itemSchema: diamonBoxInfoSchema,
});

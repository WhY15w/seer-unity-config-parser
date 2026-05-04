import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActiveSortBisaifuInfo {
  controller: string;
  dailyRed: number;
  dest: string;
  finishtime: string;
  iOSreviewshow: number;
  id: number;
  image: string;
  isdeadline: number;
  isshow: number;
  jumptarget: number;
  name: string;
  priority: number;
  reddotid?: number[];
  statlog: string;
  truepos: number;
  type: number;
}

export interface ActiveSortBisaifuConfig {
  data?: IActiveSortBisaifuInfo[];
}

const activeSortBisaifuInfoSchema: FieldSchema = [
  ["controller", text()],
  ["dailyRed", int()],
  ["dest", text()],
  ["finishtime", text()],
  ["iOSreviewshow", int()],
  ["id", int()],
  ["image", text()],
  ["isdeadline", int()],
  ["isshow", int()],
  ["jumptarget", int()],
  ["name", text()],
  ["priority", int()],
  ["reddotid", optionalArray("int")],
  ["statlog", text()],
  ["truepos", int()],
  ["type", int()],
];

export const parseActiveSortBisaifuConfig = createSimpleListParser<IActiveSortBisaifuInfo, ActiveSortBisaifuConfig>({
  name: "active_sort_bisaifu",
  outputPath: "./json/active_sort_bisaifu.json",
  dataKey: "data",
  itemSchema: activeSortBisaifuInfoSchema,
});

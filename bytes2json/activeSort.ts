import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActiveSortInfo {
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

export interface ActiveSortConfig {
  data?: IActiveSortInfo[];
}

const activeSortInfoSchema: FieldSchema = [
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

export const parseActiveSortConfig = createSimpleListParser<IActiveSortInfo, ActiveSortConfig>({
  name: "active_sort",
  outputPath: "./json/active_sort.json",
  dataKey: "data",
  itemSchema: activeSortInfoSchema,
});

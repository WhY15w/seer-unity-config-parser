import {
  createSimpleListParser,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBraveLvInfo {
  id: number;
  petid_newseid_5thmoveid?: number[];
  storehouse: number;
  upreward?: string[];
}

export interface BraveLvConfig {
  data?: IBraveLvInfo[];
}

const braveLvInfoSchema: FieldSchema = [
  ["id", int()],
  ["petid_newseid_5thmoveid", optionalArray("int")],
  ["storehouse", int()],
  ["upreward", optionalArray("text")],
];

export const parseBraveLvConfig = createSimpleListParser<IBraveLvInfo, BraveLvConfig>({
  name: "brave_lv",
  outputPath: "./json/brave_lv.json",
  dataKey: "data",
  itemSchema: braveLvInfoSchema,
});

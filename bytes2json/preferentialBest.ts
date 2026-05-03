import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPreferentialBestInfo {
  canchoose: string;
  id: number;
  iscommon: number;
  petid: number;
  price: string;
  recommendlearningability: string;
  recommendnature: number;
  skinname: string;
}

export interface PreferentialBestConfig {
  data?: IPreferentialBestInfo[];
}

const preferentialBestInfoSchema: FieldSchema = [
  ["canchoose", text()],
  ["id", int()],
  ["iscommon", int()],
  ["petid", int()],
  ["price", text()],
  ["recommendlearningability", text()],
  ["recommendnature", int()],
  ["skinname", text()],
];

export const parsePreferentialBestConfig = createSimpleListParser<IPreferentialBestInfo, PreferentialBestConfig>({
  name: "PreferentialBest",
  outputPath: "./json/PreferentialBest.json",
  dataKey: "data",
  itemSchema: preferentialBestInfoSchema,
});

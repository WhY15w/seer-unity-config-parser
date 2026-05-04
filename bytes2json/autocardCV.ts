import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardCVInfo {
  actName: string;
  id: number;
  name: string;
  probability: number;
  sceneApply: string;
  useID: number;
  useType: number;
}

export interface AutocardCVConfig {
  data?: IAutocardCVInfo[];
}

const autocardCVInfoSchema: FieldSchema = [
  ["actName", text()],
  ["id", int()],
  ["name", text()],
  ["probability", int()],
  ["sceneApply", text()],
  ["useID", int()],
  ["useType", int()],
];

export const parseAutocardCVConfig = createSimpleListParser<IAutocardCVInfo, AutocardCVConfig>({
  name: "autocardCV",
  outputPath: "./json/autocardCV.json",
  dataKey: "data",
  itemSchema: autocardCVInfoSchema,
});

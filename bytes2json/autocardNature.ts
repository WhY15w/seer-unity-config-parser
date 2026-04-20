import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardNatureInfo {
  name: string;
  picID: string;
  id: number;
}

export interface AutocardNatureConfig {
  data?: IAutocardNatureInfo[];
}

const autocardNatureInfoSchema: FieldSchema = [
  ["id", int()],
  ["name", text()],
  ["picID", text()],
];

export const parseAutocardNatureConfig = createSimpleListParser<
  IAutocardNatureInfo,
  AutocardNatureConfig
>({
  name: "autocardNature",
  outputPath: "./json/autocardNature.json",
  dataKey: "data",
  itemSchema: autocardNatureInfoSchema,
});

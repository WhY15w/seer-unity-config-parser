import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardClientEffectInfo {
  id: number;
  param: string;
  paramDes: string;
}

export interface AutocardClientEffectConfig {
  data?: IAutocardClientEffectInfo[];
}

const autocardClientEffectInfoSchema: FieldSchema = [
  ["id", int()],
  ["param", text()],
  ["paramDes", text()],
];

export const parseAutocardClientEffectConfig = createSimpleListParser<IAutocardClientEffectInfo, AutocardClientEffectConfig>({
  name: "autocardClientEffect",
  outputPath: "./json/autocardClientEffect.json",
  dataKey: "data",
  itemSchema: autocardClientEffectInfoSchema,
});

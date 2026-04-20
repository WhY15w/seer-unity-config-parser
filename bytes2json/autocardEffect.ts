import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardEffectInfo {
  param: string;
  paramDes: string;
  id: number;
}

export interface AutocardEffectConfig {
  data?: IAutocardEffectInfo[];
}

const autocardEffectInfoSchema: FieldSchema = [
  ["id", int()],
  ["param", text()],
  ["paramDes", text()],
];

export const parseAutocardEffectConfig = createSimpleListParser<
  IAutocardEffectInfo,
  AutocardEffectConfig
>({
  name: "autocardEffect",
  outputPath: "./json/autocardEffect.json",
  dataKey: "data",
  itemSchema: autocardEffectInfoSchema,
});

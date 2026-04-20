import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardEffectIconDesInfo {
  des: string;
  name: string;
  resourceName: string;
  id: number;
}

export interface AutocardEffectIconDesConfig {
  data?: IAutocardEffectIconDesInfo[];
}

const autocardEffectIconDesInfoSchema: FieldSchema = [
  ["des", text()],
  ["id", int()],
  ["name", text()],
  ["resourceName", text()],
];

export const parseAutocardEffectIconDesConfig = createSimpleListParser<
  IAutocardEffectIconDesInfo,
  AutocardEffectIconDesConfig
>({
  name: "autocardEffectIconDes",
  outputPath: "./json/autocardEffectIconDes.json",
  dataKey: "data",
  itemSchema: autocardEffectIconDesInfoSchema,
});

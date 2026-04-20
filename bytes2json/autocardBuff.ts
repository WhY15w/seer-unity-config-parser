import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardBuffInfo {
  effectIcon: string;
  object: string;
  param: string;
  paramDes: string;
  id: number;
  IsDeathEffect: number;
  IsPlaceEffect: number;
}

export interface AutocardBuffConfig {
  data?: IAutocardBuffInfo[];
}

const autocardBuffInfoSchema: FieldSchema = [
  ["IsDeathEffect", int()],
  ["IsPlaceEffect", int()],
  ["effectIcon", text()],
  ["id", int()],
  ["object", text()],
  ["param", text()],
  ["paramDes", text()],
];

export const parseAutocardBuffConfig = createSimpleListParser<
  IAutocardBuffInfo,
  AutocardBuffConfig
>({
  name: "autocardBuff",
  outputPath: "./json/autocardBuff.json",
  dataKey: "data",
  itemSchema: autocardBuffInfoSchema,
});

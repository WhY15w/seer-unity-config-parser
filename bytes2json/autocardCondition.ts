import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardConditionInfo {
  param: string;
  paramDes: string;
  id: number;
}

export interface AutocardConditionConfig {
  data?: IAutocardConditionInfo[];
}

const autocardConditionInfoSchema: FieldSchema = [
  ["id", int()],
  ["param", text()],
  ["paramDes", text()],
];

export const parseAutocardConditionConfig = createSimpleListParser<
  IAutocardConditionInfo,
  AutocardConditionConfig
>({
  name: "autocardCondition",
  outputPath: "./json/autocardCondition.json",
  dataKey: "data",
  itemSchema: autocardConditionInfoSchema,
});

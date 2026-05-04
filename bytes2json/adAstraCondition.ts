import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraConditionInfo {
  btldesc: string;
  id: number;
}

export interface AdAstraConditionConfig {
  data?: IAdAstraConditionInfo[];
}

const adAstraConditionInfoSchema: FieldSchema = [
  ["btldesc", text()],
  ["id", int()],
];

export const parseAdAstraConditionConfig = createSimpleListParser<IAdAstraConditionInfo, AdAstraConditionConfig>({
  name: "AdAstraCondition",
  outputPath: "./json/AdAstraCondition.json",
  dataKey: "data",
  itemSchema: adAstraConditionInfoSchema,
});

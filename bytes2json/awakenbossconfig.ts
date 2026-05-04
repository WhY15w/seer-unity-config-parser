import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenbossconfigInfo {
  id: number;
  monsterId: number;
}

export interface AwakenbossconfigConfig {
  data?: IAwakenbossconfigInfo[];
}

const awakenbossconfigInfoSchema: FieldSchema = [
  ["id", int()],
  ["monsterId", int()],
];

export const parseAwakenbossconfigConfig = createSimpleListParser<IAwakenbossconfigInfo, AwakenbossconfigConfig>({
  name: "awakenbossconfig",
  outputPath: "./json/awakenbossconfig.json",
  dataKey: "data",
  itemSchema: awakenbossconfigInfoSchema,
});

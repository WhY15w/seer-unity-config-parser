import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMedaltaskInfo {
  describe: string;
  id: number;
  jump?: string[];
  rewardinfo?: number[];
  target: number;
  value: string;
}

export interface MedaltaskConfig {
  data?: IMedaltaskInfo[];
}

const medaltaskInfoSchema: FieldSchema = [
  ["describe", text()],
  ["id", int()],
  ["jump", optionalArray("text")],
  ["rewardinfo", optionalArray("int")],
  ["target", int()],
  ["value", text()],
];

export const parseMedaltaskConfig = createSimpleListParser<IMedaltaskInfo, MedaltaskConfig>({
  name: "medaltask",
  outputPath: "./json/medaltask.json",
  dataKey: "data",
  itemSchema: medaltaskInfoSchema,
});

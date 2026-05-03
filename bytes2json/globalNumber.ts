import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IGlobalNumberInfo {
  content: number;
  id: number;
  name: string;
}

export interface GlobalNumberConfig {
  data?: IGlobalNumberInfo[];
}

const globalNumberInfoSchema: FieldSchema = [
  ["content", int()],
  ["id", int()],
  ["name", text()],
];

export const parseGlobalNumberConfig = createSimpleListParser<IGlobalNumberInfo, GlobalNumberConfig>({
  name: "globalNumber",
  outputPath: "./json/globalNumber.json",
  dataKey: "data",
  itemSchema: globalNumberInfoSchema,
});

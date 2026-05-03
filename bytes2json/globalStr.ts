import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IGlobalStrInfo {
  content: string;
  id: number;
  name: string;
}

export interface GlobalStrConfig {
  data?: IGlobalStrInfo[];
}

const globalStrInfoSchema: FieldSchema = [
  ["content", text()],
  ["id", int()],
  ["name", text()],
];

export const parseGlobalStrConfig = createSimpleListParser<IGlobalStrInfo, GlobalStrConfig>({
  name: "globalStr",
  outputPath: "./json/globalStr.json",
  dataKey: "data",
  itemSchema: globalStrInfoSchema,
});

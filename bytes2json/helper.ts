import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IHelperInfo {
  group: number;
  id: number;
  jump: string;
  node: string;
  picture: string;
  searchword: string;
  text: string;
  title: string;
  type: number;
}

export interface HelperConfig {
  data?: IHelperInfo[];
}

const helperInfoSchema: FieldSchema = [
  ["group", int()],
  ["id", int()],
  ["jump", text()],
  ["node", text()],
  ["picture", text()],
  ["searchword", text()],
  ["text", text()],
  ["title", text()],
  ["type", int()],
];

export const parseHelperConfig = createSimpleListParser<IHelperInfo, HelperConfig>({
  name: "helper",
  outputPath: "./json/helper.json",
  dataKey: "data",
  itemSchema: helperInfoSchema,
});

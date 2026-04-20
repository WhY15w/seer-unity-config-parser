import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILanguageInfo {
  id: number;
  content: string;
  key: string;
}

export interface IRootInterface {
  data?: ILanguageInfo[];
}

const languageInfoSchema: FieldSchema = [
  ["content", text()],
  ["id", int()],
  ["key", text()],
];

export const parseLanguageConfig = createSimpleListParser<
  ILanguageInfo,
  IRootInterface
>({
  name: "language",
  outputPath: "./json/language.json",
  dataKey: "data",
  itemSchema: languageInfoSchema,
});

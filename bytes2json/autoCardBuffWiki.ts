import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutoCardBuffWikiInfo {
  id: number;
  picture: string;
}

export interface AutoCardBuffWikiConfig {
  data?: IAutoCardBuffWikiInfo[];
}

const autoCardBuffWikiInfoSchema: FieldSchema = [
  ["id", int()],
  ["picture", text()],
];

export const parseAutoCardBuffWikiConfig = createSimpleListParser<IAutoCardBuffWikiInfo, AutoCardBuffWikiConfig>({
  name: "autoCardBuffWiki",
  outputPath: "./json/autoCardBuffWiki.json",
  dataKey: "data",
  itemSchema: autoCardBuffWikiInfoSchema,
});

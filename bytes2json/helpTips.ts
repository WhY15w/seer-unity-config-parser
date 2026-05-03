import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IHelpTipsInfo {
  desc: string;
  html: string;
  id: number;
  tips: string;
  title: string;
  type: number;
}

export interface HelpTipsConfig {
  data?: IHelpTipsInfo[];
}

const helpTipsInfoSchema: FieldSchema = [
  ["desc", text()],
  ["html", text()],
  ["id", int()],
  ["tips", text()],
  ["title", text()],
  ["type", int()],
];

export const parseHelpTipsConfig = createSimpleListParser<IHelpTipsInfo, HelpTipsConfig>({
  name: "help_tips",
  outputPath: "./json/help_tips.json",
  dataKey: "data",
  itemSchema: helpTipsInfoSchema,
});

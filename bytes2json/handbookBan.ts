import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IHandbookBanInfo {
  details: number;
  id: number;
  type: number;
}

export interface HandbookBanConfig {
  data?: IHandbookBanInfo[];
}

const handbookBanInfoSchema: FieldSchema = [
  ["details", int()],
  ["id", int()],
  ["type", int()],
];

export const parseHandbookBanConfig = createSimpleListParser<IHandbookBanInfo, HandbookBanConfig>({
  name: "handbook_ban",
  outputPath: "./json/handbook_ban.json",
  dataKey: "data",
  itemSchema: handbookBanInfoSchema,
});

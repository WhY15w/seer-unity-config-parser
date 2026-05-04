import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardScreenInfo {
  duration: number;
  endTime: number;
  id: number;
  jumpTo: number;
  jumpToLink: string;
  sort: number;
  source: string;
  startTime: number;
}

export interface AutocardScreenConfig {
  data?: IAutocardScreenInfo[];
}

const autocardScreenInfoSchema: FieldSchema = [
  ["duration", int()],
  ["endTime", int()],
  ["id", int()],
  ["jumpTo", int()],
  ["jumpToLink", text()],
  ["sort", int()],
  ["source", text()],
  ["startTime", int()],
];

export const parseAutocardScreenConfig = createSimpleListParser<IAutocardScreenInfo, AutocardScreenConfig>({
  name: "autocardScreen",
  outputPath: "./json/autocardScreen.json",
  dataKey: "data",
  itemSchema: autocardScreenInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardSkinInfo {
  name: string;
  skinName: string;
  contentId: number;
  id: number;
  series: number;
  type: number;
}

export interface AutocardSkinConfig {
  data?: IAutocardSkinInfo[];
}

const autocardSkinInfoSchema: FieldSchema = [
  ["contentId", int()],
  ["id", int()],
  ["name", text()],
  ["series", int()],
  ["skinName", text()],
  ["type", int()],
];

export const parseAutocardSkinConfig = createSimpleListParser<
  IAutocardSkinInfo,
  AutocardSkinConfig
>({
  name: "autocardSkin",
  outputPath: "./json/autocardSkin.json",
  dataKey: "data",
  itemSchema: autocardSkinInfoSchema,
});

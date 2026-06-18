import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardSkinInfo {
  getDes: string;
  name: string;
  position: string;
  resource: string;
  skinName: string;
  tag: string;
  contentId: number;
  id: number;
  ishow: number;
  jumpId: number;
  rarity: number;
  series: number;
  stat: number;
  type: number;
}

export interface AutocardSkinConfig {
  data?: IAutocardSkinInfo[];
}

const autocardSkinInfoSchema: FieldSchema = [
  ["contentId", int()],
  ["getDes", text()],
  ["id", int()],
  ["ishow", int()],
  ["jumpId", int()],
  ["name", text()],
  ["position", text()],
  ["rarity", int()],
  ["resource", text()],
  ["series", int()],
  ["skinName", text()],
  ["stat", int()],
  ["tag", text()],
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

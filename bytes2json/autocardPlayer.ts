import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardPlayerInfo {
  action1: string;
  action2: string;
  action3: string;
  bookaction1: string;
  bookaction2: string;
  bookaction3: string;
  des: string;
  getdes: string;
  name: string;
  Pos: number;
  resource: string;
  skinName: string;
  tag: string;
  id: number;
  jumpinfo: number;
  MaxLevel: number;
  moveSpeed: number;
  rarity: number;
  stat: number;
}

export interface AutocardPlayerConfig {
  data?: IAutocardPlayerInfo[];
}

const autocardPlayerInfoSchema: FieldSchema = [
  ["MaxLevel", int()],
  ["Pos", text()],
  ["action1", text()],
  ["action2", text()],
  ["action3", text()],
  ["bookaction1", text()],
  ["bookaction2", text()],
  ["bookaction3", text()],
  ["des", text()],
  ["getdes", text()],
  ["id", int()],
  ["jumpinfo", int()],
  ["moveSpeed", int()],
  ["name", text()],
  ["rarity", int()],
  ["resource", text()],
  ["skinName", text()],
  ["stat", int()],
  ["tag", text()],
];

export const parseAutocardPlayerConfig = createSimpleListParser<
  IAutocardPlayerInfo,
  AutocardPlayerConfig
>({
  name: "autocardPlayer",
  outputPath: "./json/autocardPlayer.json",
  dataKey: "data",
  itemSchema: autocardPlayerInfoSchema,
});

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
  des: string;
  name: string;
  resource: string;
  id: number;
  jumpinfo: number;
  moveSpeed: number;
  rarity: number;
}

export interface AutocardPlayerConfig {
  data?: IAutocardPlayerInfo[];
}

const autocardPlayerInfoSchema: FieldSchema = [
  ["action1", text()],
  ["action2", text()],
  ["action3", text()],
  ["des", text()],
  ["id", int()],
  ["jumpinfo", int()],
  ["moveSpeed", int()],
  ["name", text()],
  ["rarity", int()],
  ["resource", text()],
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

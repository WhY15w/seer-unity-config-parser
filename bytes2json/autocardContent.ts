import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardContentInfo {
  BuffId: string;
  BuffParam: string;
  cardTxt: string;
  des: string;
  name: string;
  skins: string;
  attack: number;
  compose: number;
  composeTo: number;
  cost: number;
  CountNum: number;
  CountType: number;
  Display: number;
  headpicID: number;
  health: number;
  id: number;
  isUse: number;
  level: number;
  nature: number;
  picID: number;
  subtype: number;
  type: number;
}

export interface AutocardContentConfig {
  data?: IAutocardContentInfo[];
}

const autocardContentInfoSchema: FieldSchema = [
  ["BuffId", text()],
  ["BuffParam", text()],
  ["CountNum", int()],
  ["CountType", int()],
  ["Display", int()],
  ["attack", int()],
  ["cardTxt", text()],
  ["compose", int()],
  ["composeTo", int()],
  ["cost", int()],
  ["des", text()],
  ["headpicID", int()],
  ["health", int()],
  ["id", int()],
  ["isUse", int()],
  ["level", int()],
  ["name", text()],
  ["nature", int()],
  ["picID", int()],
  ["skins", text()],
  ["subtype", int()],
  ["type", int()],
];

export const parseAutocardContentConfig = createSimpleListParser<
  IAutocardContentInfo,
  AutocardContentConfig
>({
  name: "autocardContent",
  outputPath: "./json/autocardContent.json",
  dataKey: "data",
  itemSchema: autocardContentInfoSchema,
});

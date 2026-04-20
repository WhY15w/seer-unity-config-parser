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
  // effectIcon: string;
  name: string;
  attack: number;
  compose: number;
  composeTo: number;
  cost: number;
  CountNum: number;
  Display: number;
  health: number;
  id: number;
  // IsDeathEffect: number;
  // IsPlaceEffect: number;
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
  ["Display", int()],
  // ["IsDeathEffect", int()],
  // ["IsPlaceEffect", int()],
  ["attack", int()],
  ["cardTxt", text()],
  ["compose", int()],
  ["composeTo", int()],
  ["cost", int()],
  ["des", text()],
  // ["effectIcon", text()],
  ["health", int()],
  ["id", int()],
  ["isUse", int()],
  ["level", int()],
  ["name", text()],
  ["nature", int()],
  ["picID", int()],
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

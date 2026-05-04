import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardShopInfo {
  bonuscard: number;
  cardmax: number;
  id: number;
  level: number;
  lvlup_cost: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  rate6: number;
}

export interface AutocardShopConfig {
  data?: IAutocardShopInfo[];
}

const autocardShopInfoSchema: FieldSchema = [
  ["bonuscard", int()],
  ["cardmax", int()],
  ["id", int()],
  ["level", int()],
  ["lvlup_cost", int()],
  ["rate1", int()],
  ["rate2", int()],
  ["rate3", int()],
  ["rate4", int()],
  ["rate5", int()],
  ["rate6", int()],
];

export const parseAutocardShopConfig = createSimpleListParser<IAutocardShopInfo, AutocardShopConfig>({
  name: "autocardShop",
  outputPath: "./json/autocardShop.json",
  dataKey: "data",
  itemSchema: autocardShopInfoSchema,
});

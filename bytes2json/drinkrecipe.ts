import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDrinkrecipeInfo {
  id: number;
  introduce: string;
  name: string;
  recipe1: number;
  recipe2: number;
  recipe3: number;
  tag: string;
  time: number;
  type: number;
}

export interface DrinkrecipeConfig {
  data?: IDrinkrecipeInfo[];
}

const drinkrecipeInfoSchema: FieldSchema = [
  ["id", int()],
  ["introduce", text()],
  ["name", text()],
  ["recipe1", int()],
  ["recipe2", int()],
  ["recipe3", int()],
  ["tag", text()],
  ["time", int()],
  ["type", int()],
];

export const parseDrinkrecipeConfig = createSimpleListParser<IDrinkrecipeInfo, DrinkrecipeConfig>({
  name: "drinkrecipe",
  outputPath: "./json/drinkrecipe.json",
  dataKey: "data",
  itemSchema: drinkrecipeInfoSchema,
});

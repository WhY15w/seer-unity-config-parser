import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDrinkcheckpointInfo {
  checkpoint: string;
  gift: string;
  id: number;
  introduce: string;
  name: string;
  type: number;
}

export interface DrinkcheckpointConfig {
  data?: IDrinkcheckpointInfo[];
}

const drinkcheckpointInfoSchema: FieldSchema = [
  ["checkpoint", text()],
  ["gift", text()],
  ["id", int()],
  ["introduce", text()],
  ["name", text()],
  ["type", int()],
];

export const parseDrinkcheckpointConfig = createSimpleListParser<IDrinkcheckpointInfo, DrinkcheckpointConfig>({
  name: "drinkcheckpoint",
  outputPath: "./json/drinkcheckpoint.json",
  dataKey: "data",
  itemSchema: drinkcheckpointInfoSchema,
});

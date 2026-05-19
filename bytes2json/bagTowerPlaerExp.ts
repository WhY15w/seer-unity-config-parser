import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerPlaerExpInfo {
  exp: number;
  id: number;
  lv: number;
}

export interface BagTowerPlaerExpConfig {
  data?: IBagTowerPlaerExpInfo[];
}

const bagTowerPlaerExpInfoSchema: FieldSchema = [
  ["exp", int()],
  ["id", int()],
  ["lv", int()],
];

export const parseBagTowerPlaerExpConfig = createSimpleListParser<IBagTowerPlaerExpInfo, BagTowerPlaerExpConfig>({
  name: "bagTower_PlaerExp",
  outputPath: "./json/bagTower_PlaerExp.json",
  dataKey: "data",
  itemSchema: bagTowerPlaerExpInfoSchema,
});

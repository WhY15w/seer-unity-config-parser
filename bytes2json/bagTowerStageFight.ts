import {
  createSimpleListParser,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerStageFightInfo {
  atkmonsterup: number;
  delaytime: number;
  exo: number;
  hpmonsterup: number;
  id: number;
  isboss: number;
  monster?: number[];
  position?: number[];
  stage: number;
  wave: number;
}

export interface BagTowerStageFightConfig {
  data?: IBagTowerStageFightInfo[];
}

const bagTowerStageFightInfoSchema: FieldSchema = [
  ["atkmonsterup", int()],
  ["delaytime", int()],
  ["exo", int()],
  ["hpmonsterup", int()],
  ["id", int()],
  ["isboss", int()],
  ["monster", optionalArray("int")],
  ["position", optionalArray("int")],
  ["stage", int()],
  ["wave", int()],
];

export const parseBagTowerStageFightConfig = createSimpleListParser<IBagTowerStageFightInfo, BagTowerStageFightConfig>({
  name: "bagTower_StageFight",
  outputPath: "./json/bagTower_StageFight.json",
  dataKey: "data",
  itemSchema: bagTowerStageFightInfoSchema,
});

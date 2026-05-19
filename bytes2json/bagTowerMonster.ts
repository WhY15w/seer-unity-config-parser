import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerMonsterInfo {
  id: number;
  initialatk: number;
  initialhp: number;
  issplit?: number[];
  monstertype: number;
  move: number;
  name: string;
  range: number;
  speed: number;
}

export interface BagTowerMonsterConfig {
  data?: IBagTowerMonsterInfo[];
}

const bagTowerMonsterInfoSchema: FieldSchema = [
  ["id", int()],
  ["initialatk", int()],
  ["initialhp", int()],
  ["issplit", optionalArray("int")],
  ["monstertype", int()],
  ["move", int()],
  ["name", text()],
  ["range", int()],
  ["speed", int()],
];

export const parseBagTowerMonsterConfig = createSimpleListParser<IBagTowerMonsterInfo, BagTowerMonsterConfig>({
  name: "bagTower_Monster",
  outputPath: "./json/bagTower_Monster.json",
  dataKey: "data",
  itemSchema: bagTowerMonsterInfoSchema,
});

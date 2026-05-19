import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerStageInfo {
  bg: number;
  id: number;
  initialcoin: number;
  lockequip: number;
  name: string;
  stagetype: number;
  time: number;
  unlock: number;
  wavenum: number;
}

export interface BagTowerStageConfig {
  data?: IBagTowerStageInfo[];
}

const bagTowerStageInfoSchema: FieldSchema = [
  ["bg", int()],
  ["id", int()],
  ["initialcoin", int()],
  ["lockequip", int()],
  ["name", text()],
  ["stagetype", int()],
  ["time", int()],
  ["unlock", int()],
  ["wavenum", int()],
];

export const parseBagTowerStageConfig = createSimpleListParser<IBagTowerStageInfo, BagTowerStageConfig>({
  name: "bagTower_Stage",
  outputPath: "./json/bagTower_Stage.json",
  dataKey: "data",
  itemSchema: bagTowerStageInfoSchema,
});

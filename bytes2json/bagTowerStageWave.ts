import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerStageWaveInfo {
  getreward: number;
  id: number;
  loop: number;
  opengrid: string;
  refresh: number;
  reward1: number;
  reward2: number;
  stage: number;
  wave: number;
  weight1: string;
  weight2: string;
  weight3: string;
}

export interface BagTowerStageWaveConfig {
  data?: IBagTowerStageWaveInfo[];
}

const bagTowerStageWaveInfoSchema: FieldSchema = [
  ["getreward", int()],
  ["id", int()],
  ["loop", int()],
  ["opengrid", text()],
  ["refresh", int()],
  ["reward1", int()],
  ["reward2", int()],
  ["stage", int()],
  ["wave", int()],
  ["weight1", text()],
  ["weight2", text()],
  ["weight3", text()],
];

export const parseBagTowerStageWaveConfig = createSimpleListParser<IBagTowerStageWaveInfo, BagTowerStageWaveConfig>({
  name: "bagTower_StageWave",
  outputPath: "./json/bagTower_StageWave.json",
  dataKey: "data",
  itemSchema: bagTowerStageWaveInfoSchema,
});

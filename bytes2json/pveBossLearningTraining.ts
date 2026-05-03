import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPveBossLearningTrainingInfo {
  bosslist?: number[];
  id: number;
  raidunlockarg: number;
  raidunlocktext: string;
  rewardid?: number[];
  rewardnum?: number[];
}

export interface PveBossLearningTrainingConfig {
  data?: IPveBossLearningTrainingInfo[];
}

const pveBossLearningTrainingInfoSchema: FieldSchema = [
  ["bosslist", optionalArray("int")],
  ["id", int()],
  ["raidunlockarg", int()],
  ["raidunlocktext", text()],
  ["rewardid", optionalArray("int")],
  ["rewardnum", optionalArray("int")],
];

export const parsePveBossLearningTrainingConfig = createSimpleListParser<IPveBossLearningTrainingInfo, PveBossLearningTrainingConfig>({
  name: "PveBossLearningTraining",
  outputPath: "./json/PveBossLearningTraining.json",
  dataKey: "data",
  itemSchema: pveBossLearningTrainingInfoSchema,
});

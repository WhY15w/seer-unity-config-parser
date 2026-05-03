import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPveBossExperienceTrainingInfo {
  bosslist?: number[];
  id: number;
  raidunlockarg: number;
  raidunlocktext: string;
  rewardid?: number[];
  rewardnum?: number[];
}

export interface PveBossExperienceTrainingConfig {
  data?: IPveBossExperienceTrainingInfo[];
}

const pveBossExperienceTrainingInfoSchema: FieldSchema = [
  ["bosslist", optionalArray("int")],
  ["id", int()],
  ["raidunlockarg", int()],
  ["raidunlocktext", text()],
  ["rewardid", optionalArray("int")],
  ["rewardnum", optionalArray("int")],
];

export const parsePveBossExperienceTrainingConfig = createSimpleListParser<IPveBossExperienceTrainingInfo, PveBossExperienceTrainingConfig>({
  name: "PveBossExperienceTraining",
  outputPath: "./json/PveBossExperienceTraining.json",
  dataKey: "data",
  itemSchema: pveBossExperienceTrainingInfoSchema,
});

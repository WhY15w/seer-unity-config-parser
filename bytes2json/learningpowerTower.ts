import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILearningpowerTowerInfo {
  bosslist: string;
  id: number;
  raidunlockarg: number;
  raidunlocktext: string;
  rewardid: string;
  rewardnum: string;
  rewardtype: string;
  sebossid: string;
}

export interface LearningpowerTowerConfig {
  data?: ILearningpowerTowerInfo[];
}

const learningpowerTowerInfoSchema: FieldSchema = [
  ["bosslist", text()],
  ["id", int()],
  ["raidunlockarg", int()],
  ["raidunlocktext", text()],
  ["rewardid", text()],
  ["rewardnum", text()],
  ["rewardtype", text()],
  ["sebossid", text()],
];

export const parseLearningpowerTowerConfig = createSimpleListParser<ILearningpowerTowerInfo, LearningpowerTowerConfig>({
  name: "learningpower_tower",
  outputPath: "./json/learningpower_tower.json",
  dataKey: "data",
  itemSchema: learningpowerTowerInfoSchema,
});

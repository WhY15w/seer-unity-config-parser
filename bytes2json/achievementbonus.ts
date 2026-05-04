import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAchievementbonusInfo {
  Branch: number;
  Rule: number;
  id: number;
  rewardcnt: string;
  rewardid: string;
  rewardtype: number;
}

export interface AchievementbonusConfig {
  data?: IAchievementbonusInfo[];
}

const achievementbonusInfoSchema: FieldSchema = [
  ["Branch", int()],
  ["Rule", int()],
  ["id", int()],
  ["rewardcnt", text()],
  ["rewardid", text()],
  ["rewardtype", int()],
];

export const parseAchievementbonusConfig = createSimpleListParser<IAchievementbonusInfo, AchievementbonusConfig>({
  name: "achievementbonus",
  outputPath: "./json/achievementbonus.json",
  dataKey: "data",
  itemSchema: achievementbonusInfoSchema,
});

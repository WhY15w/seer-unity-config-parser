import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBadgeBattlePassRewardInfo {
  diamondnum: number;
  exp: number;
  freereward: string;
  id: number;
  paidreward: string;
}

export interface BadgeBattlePassRewardConfig {
  data?: IBadgeBattlePassRewardInfo[];
}

const badgeBattlePassRewardInfoSchema: FieldSchema = [
  ["diamondnum", int()],
  ["exp", int()],
  ["freereward", text()],
  ["id", int()],
  ["paidreward", text()],
];

export const parseBadgeBattlePassRewardConfig = createSimpleListParser<IBadgeBattlePassRewardInfo, BadgeBattlePassRewardConfig>({
  name: "badgeBattlePass_reward",
  outputPath: "./json/badgeBattlePass_reward.json",
  dataKey: "data",
  itemSchema: badgeBattlePassRewardInfoSchema,
});

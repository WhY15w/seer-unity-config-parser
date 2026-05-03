import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpRewardInfo {
  group: number;
  id: number;
  rewardshow: string;
  type: number;
}

export interface PvpRewardConfig {
  data?: IPvpRewardInfo[];
}

const pvpRewardInfoSchema: FieldSchema = [
  ["group", int()],
  ["id", int()],
  ["rewardshow", text()],
  ["type", int()],
];

export const parsePvpRewardConfig = createSimpleListParser<IPvpRewardInfo, PvpRewardConfig>({
  name: "pvp_reward",
  outputPath: "./json/pvp_reward.json",
  dataKey: "data",
  itemSchema: pvpRewardInfoSchema,
});

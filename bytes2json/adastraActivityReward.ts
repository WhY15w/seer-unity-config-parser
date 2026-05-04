import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdastraActivityRewardInfo {
  condition: number;
  id: number;
  reward: string;
  type: number;
}

export interface AdastraActivityRewardConfig {
  data?: IAdastraActivityRewardInfo[];
}

const adastraActivityRewardInfoSchema: FieldSchema = [
  ["condition", int()],
  ["id", int()],
  ["reward", text()],
  ["type", int()],
];

export const parseAdastraActivityRewardConfig = createSimpleListParser<IAdastraActivityRewardInfo, AdastraActivityRewardConfig>({
  name: "AdastraActivityReward",
  outputPath: "./json/AdastraActivityReward.json",
  dataKey: "data",
  itemSchema: adastraActivityRewardInfoSchema,
});

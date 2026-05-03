import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPrivateCostDiamondRewardInfo {
  id: number;
  reward: string;
  step: number;
}

export interface PrivateCostDiamondRewardConfig {
  data?: IPrivateCostDiamondRewardInfo[];
}

const privateCostDiamondRewardInfoSchema: FieldSchema = [
  ["id", int()],
  ["reward", text()],
  ["step", int()],
];

export const parsePrivateCostDiamondRewardConfig = createSimpleListParser<IPrivateCostDiamondRewardInfo, PrivateCostDiamondRewardConfig>({
  name: "privateCostDiamondReward",
  outputPath: "./json/privateCostDiamondReward.json",
  dataKey: "data",
  itemSchema: privateCostDiamondRewardInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPrivateTrainExtraRewardInfo {
  id: number;
  reward: string;
  value: number;
}

export interface PrivateTrainExtraRewardConfig {
  data?: IPrivateTrainExtraRewardInfo[];
}

const privateTrainExtraRewardInfoSchema: FieldSchema = [
  ["id", int()],
  ["reward", text()],
  ["value", int()],
];

export const parsePrivateTrainExtraRewardConfig = createSimpleListParser<IPrivateTrainExtraRewardInfo, PrivateTrainExtraRewardConfig>({
  name: "privateTrainExtraReward",
  outputPath: "./json/privateTrainExtraReward.json",
  dataKey: "data",
  itemSchema: privateTrainExtraRewardInfoSchema,
});

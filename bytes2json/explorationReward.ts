import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IExplorationRewardInfo {
  class: number;
  currency: number;
  currencynum: number;
  id: number;
  item: number;
  limit: number;
  number: number;
  sort: number;
  starting: number;
  type: number;
  user_info: number;
}

export interface ExplorationRewardConfig {
  data?: IExplorationRewardInfo[];
}

const explorationRewardInfoSchema: FieldSchema = [
  ["class", int()],
  ["currency", int()],
  ["currencynum", int()],
  ["id", int()],
  ["item", int()],
  ["limit", int()],
  ["number", int()],
  ["sort", int()],
  ["starting", int()],
  ["type", int()],
  ["user_info", int()],
];

export const parseExplorationRewardConfig = createSimpleListParser<IExplorationRewardInfo, ExplorationRewardConfig>({
  name: "ExplorationReward",
  outputPath: "./json/ExplorationReward.json",
  dataKey: "data",
  itemSchema: explorationRewardInfoSchema,
});

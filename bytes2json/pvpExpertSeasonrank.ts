import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpExpertSeasonrankInfo {
  account1: number;
  account2: number;
  account3: number;
  id: number;
  score1: number;
  score2: number;
  score3: number;
  time: string;
  winrate1: number;
  winrate2: number;
  winrate3: number;
}

export interface PvpExpertSeasonrankConfig {
  data?: IPvpExpertSeasonrankInfo[];
}

const pvpExpertSeasonrankInfoSchema: FieldSchema = [
  ["account1", int()],
  ["account2", int()],
  ["account3", int()],
  ["id", int()],
  ["score1", int()],
  ["score2", int()],
  ["score3", int()],
  ["time", text()],
  ["winrate1", int()],
  ["winrate2", int()],
  ["winrate3", int()],
];

export const parsePvpExpertSeasonrankConfig = createSimpleListParser<IPvpExpertSeasonrankInfo, PvpExpertSeasonrankConfig>({
  name: "pvp_expert_seasonrank",
  outputPath: "./json/pvp_expert_seasonrank.json",
  dataKey: "data",
  itemSchema: pvpExpertSeasonrankInfoSchema,
});

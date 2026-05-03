import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMatchGameInfo {
  Horizontal: number;
  Vertical: number;
  beginning: string;
  describe: string;
  ending: string;
  id: number;
  name: string;
  npdSkin: number;
  reward: string;
  score: number;
  time: number;
}

export interface MatchGameConfig {
  data?: IMatchGameInfo[];
}

const matchGameInfoSchema: FieldSchema = [
  ["Horizontal", int()],
  ["Vertical", int()],
  ["beginning", text()],
  ["describe", text()],
  ["ending", text()],
  ["id", int()],
  ["name", text()],
  ["npdSkin", int()],
  ["reward", text()],
  ["score", int()],
  ["time", int()],
];

export const parseMatchGameConfig = createSimpleListParser<IMatchGameInfo, MatchGameConfig>({
  name: "match_game",
  outputPath: "./json/match_game.json",
  dataKey: "data",
  itemSchema: matchGameInfoSchema,
});

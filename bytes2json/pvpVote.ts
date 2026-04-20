import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpVoteInfo {
  id: number;
  name: string;
  number: number;
  oldresult: string;
  ranklimit1: number;
  ranklimit2: number;
  result: string;
  subkey: number;
  time1: number;
  time2: number;
  type: number;
}

export interface IRootInterface {
  data?: IPvpVoteInfo[];
}

const pvpVoteSchema: FieldSchema = [
  ["id", int()],
  ["name", text()],
  ["number", int()],
  ["oldresult", text()],
  ["ranklimit1", int()],
  ["ranklimit2", int()],
  ["result", text()],
  ["subkey", int()],
  ["time1", int()],
  ["time2", int()],
  ["type", int()],
];

export const parsePvpVoteConfig = createSimpleListParser<
  IPvpVoteInfo,
  IRootInterface
>({
  name: "pvp_vote",
  outputPath: "./json/pvp_vote.json",
  dataKey: "data",
  itemSchema: pvpVoteSchema,
});

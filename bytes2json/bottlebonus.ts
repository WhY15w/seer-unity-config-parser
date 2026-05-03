import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBottlebonusInfo {
  exchangecut: number;
  exchangenum: number;
  id: number;
  needcnt: number;
  needitem: number;
  output: number;
  realid: number;
  type: number;
}

export interface BottlebonusConfig {
  data?: IBottlebonusInfo[];
}

const bottlebonusInfoSchema: FieldSchema = [
  ["exchangecut", int()],
  ["exchangenum", int()],
  ["id", int()],
  ["needcnt", int()],
  ["needitem", int()],
  ["output", int()],
  ["realid", int()],
  ["type", int()],
];

export const parseBottlebonusConfig = createSimpleListParser<IBottlebonusInfo, BottlebonusConfig>({
  name: "bottlebonus",
  outputPath: "./json/bottlebonus.json",
  dataKey: "data",
  itemSchema: bottlebonusInfoSchema,
});

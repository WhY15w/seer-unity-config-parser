import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpQuiztaskInfo {
  describe: string;
  id: number;
  jumptarget: number;
  rewardinfo?: number[];
  value: number;
}

export interface PvpQuiztaskConfig {
  data?: IPvpQuiztaskInfo[];
}

const pvpQuiztaskInfoSchema: FieldSchema = [
  ["describe", text()],
  ["id", int()],
  ["jumptarget", int()],
  ["rewardinfo", optionalArray("int")],
  ["value", int()],
];

export const parsePvpQuiztaskConfig = createSimpleListParser<IPvpQuiztaskInfo, PvpQuiztaskConfig>({
  name: "pvp_quiztask",
  outputPath: "./json/pvp_quiztask.json",
  dataKey: "data",
  itemSchema: pvpQuiztaskInfoSchema,
});

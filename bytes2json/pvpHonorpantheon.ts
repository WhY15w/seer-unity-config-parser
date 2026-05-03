import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpHonorpantheonInfo {
  id: number;
  img: string;
  name: string;
  suit: number;
}

export interface PvpHonorpantheonConfig {
  data?: IPvpHonorpantheonInfo[];
}

const pvpHonorpantheonInfoSchema: FieldSchema = [
  ["id", int()],
  ["img", text()],
  ["name", text()],
  ["suit", int()],
];

export const parsePvpHonorpantheonConfig = createSimpleListParser<IPvpHonorpantheonInfo, PvpHonorpantheonConfig>({
  name: "pvp_honorpantheon",
  outputPath: "./json/pvp_honorpantheon.json",
  dataKey: "data",
  itemSchema: pvpHonorpantheonInfoSchema,
});

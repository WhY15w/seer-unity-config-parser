import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenlistInfo {
  awakentype: number;
  bosslevelid: number;
  diamondid: number;
  enddate: string;
  exchangepercnt: number;
  fragmentid: number;
  fragmentnum: number;
  id: number;
  itemnum: number;
  itemurl: number;
  jumpparam: string;
  limitid: string;
  monstername: string;
  mosterurl: number;
  onekeyproductid: number;
  startdate: string;
}

export interface AwakenlistConfig {
  data?: IAwakenlistInfo[];
}

const awakenlistInfoSchema: FieldSchema = [
  ["awakentype", int()],
  ["bosslevelid", int()],
  ["diamondid", int()],
  ["enddate", text()],
  ["exchangepercnt", int()],
  ["fragmentid", int()],
  ["fragmentnum", int()],
  ["id", int()],
  ["itemnum", int()],
  ["itemurl", int()],
  ["jumpparam", text()],
  ["limitid", text()],
  ["monstername", text()],
  ["mosterurl", int()],
  ["onekeyproductid", int()],
  ["startdate", text()],
];

export const parseAwakenlistConfig = createSimpleListParser<IAwakenlistInfo, AwakenlistConfig>({
  name: "awakenlist",
  outputPath: "./json/awakenlist.json",
  dataKey: "data",
  itemSchema: awakenlistInfoSchema,
});

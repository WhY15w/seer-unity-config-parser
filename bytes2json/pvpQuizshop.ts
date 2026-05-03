import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpQuizshopInfo {
  consumeitemid: number;
  id: number;
  limit: number;
  name: string;
  price: number;
  product: number;
  productnum: number;
  producttype: number;
  quantity: number;
}

export interface PvpQuizshopConfig {
  data?: IPvpQuizshopInfo[];
}

const pvpQuizshopInfoSchema: FieldSchema = [
  ["consumeitemid", int()],
  ["id", int()],
  ["limit", int()],
  ["name", text()],
  ["price", int()],
  ["product", int()],
  ["productnum", int()],
  ["producttype", int()],
  ["quantity", int()],
];

export const parsePvpQuizshopConfig = createSimpleListParser<IPvpQuizshopInfo, PvpQuizshopConfig>({
  name: "pvp_quizshop",
  outputPath: "./json/pvp_quizshop.json",
  dataKey: "data",
  itemSchema: pvpQuizshopInfoSchema,
});

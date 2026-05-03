import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpShopInfo {
  bagLimit: number;
  commodity: string;
  consumeitemid: number;
  discount: number;
  id: number;
  limit: number;
  petinfo: string;
  price: number;
  producttype: number;
  quantity: number;
  sort: number;
  suit: number;
  type: number;
  userinfo: number;
}

export interface PvpShopConfig {
  data?: IPvpShopInfo[];
}

const pvpShopInfoSchema: FieldSchema = [
  ["bagLimit", int()],
  ["commodity", text()],
  ["consumeitemid", int()],
  ["discount", int()],
  ["id", int()],
  ["limit", int()],
  ["petinfo", text()],
  ["price", int()],
  ["producttype", int()],
  ["quantity", int()],
  ["sort", int()],
  ["suit", int()],
  ["type", int()],
  ["userinfo", int()],
];

export const parsePvpShopConfig = createSimpleListParser<IPvpShopInfo, PvpShopConfig>({
  name: "pvp_shop",
  outputPath: "./json/pvp_shop.json",
  dataKey: "data",
  itemSchema: pvpShopInfoSchema,
});

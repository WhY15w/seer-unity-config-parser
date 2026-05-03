import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpShopBisaifuInfo {
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

export interface PvpShopBisaifuConfig {
  data?: IPvpShopBisaifuInfo[];
}

const pvpShopBisaifuInfoSchema: FieldSchema = [
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

export const parsePvpShopBisaifuConfig = createSimpleListParser<IPvpShopBisaifuInfo, PvpShopBisaifuConfig>({
  name: "pvp_shop_bisaifu",
  outputPath: "./json/pvp_shop_bisaifu.json",
  dataKey: "data",
  itemSchema: pvpShopBisaifuInfoSchema,
});

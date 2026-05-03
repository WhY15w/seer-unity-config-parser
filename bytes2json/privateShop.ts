import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPrivateShopInfo {
  bytepos: number;
  content: string;
  costNum: number;
  costType: number;
  id: number;
  limitNum: number;
  limitType: number;
  originPrice: number;
  productID: number;
  title: string;
  type: number;
  userinfo: number;
}

export interface PrivateShopConfig {
  data?: IPrivateShopInfo[];
}

const privateShopInfoSchema: FieldSchema = [
  ["bytepos", int()],
  ["content", text()],
  ["costNum", int()],
  ["costType", int()],
  ["id", int()],
  ["limitNum", int()],
  ["limitType", int()],
  ["originPrice", int()],
  ["productID", int()],
  ["title", text()],
  ["type", int()],
  ["userinfo", int()],
];

export const parsePrivateShopConfig = createSimpleListParser<IPrivateShopInfo, PrivateShopConfig>({
  name: "privateShop",
  outputPath: "./json/privateShop.json",
  dataKey: "data",
  itemSchema: privateShopInfoSchema,
});

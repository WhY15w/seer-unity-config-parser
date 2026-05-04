import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraShopInfo {
  content: string;
  costID: number;
  costNum: number;
  desc: string;
  id: number;
  limitNum: number;
  limitType: number;
  type: number;
}

export interface AdAstraShopConfig {
  data?: IAdAstraShopInfo[];
}

const adAstraShopInfoSchema: FieldSchema = [
  ["content", text()],
  ["costID", int()],
  ["costNum", int()],
  ["desc", text()],
  ["id", int()],
  ["limitNum", int()],
  ["limitType", int()],
  ["type", int()],
];

export const parseAdAstraShopConfig = createSimpleListParser<IAdAstraShopInfo, AdAstraShopConfig>({
  name: "AdAstraShop",
  outputPath: "./json/AdAstraShop.json",
  dataKey: "data",
  itemSchema: adAstraShopInfoSchema,
});

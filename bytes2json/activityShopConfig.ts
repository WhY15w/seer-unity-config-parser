import {
  createSimpleListParser,
  text,
  int,
  long,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IActivityShopConfigInfo {
  activityid: number;
  commodity: string;
  consumeitemid: number;
  exchangeID: number;
  id: number;
  limit: number;
  price: number;
  quantity: number;
  shoptype: string;
  sort: number;
  timeend: number;
  timelimit: number;
  timestart: number;
  userinfo: number;
}

export interface ActivityShopConfigConfig {
  data?: IActivityShopConfigInfo[];
}

const activityShopConfigInfoSchema: FieldSchema = [
  ["activityid", int()],
  ["commodity", text()],
  ["consumeitemid", int()],
  ["exchangeID", int()],
  ["id", int()],
  ["limit", int()],
  ["price", int()],
  ["quantity", int()],
  ["shoptype", text()],
  ["sort", int()],
  ["timeend", long()],
  ["timelimit", int()],
  ["timestart", int()],
  ["userinfo", int()],
];

export const parseActivityShopConfigConfig = createSimpleListParser<IActivityShopConfigInfo, ActivityShopConfigConfig>({
  name: "Activity_ShopConfig",
  outputPath: "./json/Activity_ShopConfig.json",
  dataKey: "data",
  itemSchema: activityShopConfigInfoSchema,
});

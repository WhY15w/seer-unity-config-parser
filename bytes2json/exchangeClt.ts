import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IExchangeCltInfo {
  BitSetId: number;
  LimitCnt: number;
  Limittype: number;
  POPID: number;
  Subtag: number;
  UserInfoBitPos: number;
  UserInfoId: number;
  batch: number;
  boundmonster: number;
  coinid: number;
  cointype: number;
  count: number;
  id: number;
  isjustone: number;
  monappend: string;
  price: number;
  realid: number;
  shopid: number;
  top: number;
  type: number;
}

export interface ExchangeCltConfig {
  data?: IExchangeCltInfo[];
}

const exchangeCltInfoSchema: FieldSchema = [
  ["BitSetId", int()],
  ["LimitCnt", int()],
  ["Limittype", int()],
  ["POPID", int()],
  ["Subtag", int()],
  ["UserInfoBitPos", int()],
  ["UserInfoId", int()],
  ["batch", int()],
  ["boundmonster", int()],
  ["coinid", int()],
  ["cointype", int()],
  ["count", int()],
  ["id", int()],
  ["isjustone", int()],
  ["monappend", text()],
  ["price", int()],
  ["realid", int()],
  ["shopid", int()],
  ["top", int()],
  ["type", int()],
];

export const parseExchangeCltConfig = createSimpleListParser<IExchangeCltInfo, ExchangeCltConfig>({
  name: "exchange_clt",
  outputPath: "./json/exchange_clt.json",
  dataKey: "data",
  itemSchema: exchangeCltInfoSchema,
});

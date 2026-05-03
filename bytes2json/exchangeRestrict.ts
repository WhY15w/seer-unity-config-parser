import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IExchangeRestrictInfo {
  id: number;
  key: string;
}

export interface ExchangeRestrictConfig {
  data?: IExchangeRestrictInfo[];
}

const exchangeRestrictInfoSchema: FieldSchema = [
  ["id", int()],
  ["key", text()],
];

export const parseExchangeRestrictConfig = createSimpleListParser<IExchangeRestrictInfo, ExchangeRestrictConfig>({
  name: "exchangeRestrict",
  outputPath: "./json/exchangeRestrict.json",
  dataKey: "data",
  itemSchema: exchangeRestrictInfoSchema,
});

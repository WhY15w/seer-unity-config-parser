import {
  createSimpleListParser,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMallrefreshInfo {
  id: number;
  price?: number[];
  rewardinfo?: number[];
}

export interface MallrefreshConfig {
  data?: IMallrefreshInfo[];
}

const mallrefreshInfoSchema: FieldSchema = [
  ["id", int()],
  ["price", optionalArray("int")],
  ["rewardinfo", optionalArray("int")],
];

export const parseMallrefreshConfig = createSimpleListParser<IMallrefreshInfo, MallrefreshConfig>({
  name: "mallrefresh",
  outputPath: "./json/mallrefresh.json",
  dataKey: "data",
  itemSchema: mallrefreshInfoSchema,
});

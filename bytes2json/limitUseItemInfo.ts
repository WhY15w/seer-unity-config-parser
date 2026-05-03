import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILimitUseItemInfoInfo {
  LimitUseItemId: number;
  LimitUseItemMaxNum: number;
  LimitUseItemName: string;
  LimitUseItemUserInfo: number;
  LimitUseType: number;
  id: number;
}

export interface LimitUseItemInfoConfig {
  data?: ILimitUseItemInfoInfo[];
}

const limitUseItemInfoInfoSchema: FieldSchema = [
  ["LimitUseItemId", int()],
  ["LimitUseItemMaxNum", int()],
  ["LimitUseItemName", text()],
  ["LimitUseItemUserInfo", int()],
  ["LimitUseType", int()],
  ["id", int()],
];

export const parseLimitUseItemInfoConfig = createSimpleListParser<ILimitUseItemInfoInfo, LimitUseItemInfoConfig>({
  name: "LimitUseItemInfo",
  outputPath: "./json/LimitUseItemInfo.json",
  dataKey: "data",
  itemSchema: limitUseItemInfoInfoSchema,
});

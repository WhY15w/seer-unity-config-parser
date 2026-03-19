import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBuffInfo {
  Desc: string;
  Tag: string;
  desc_tag: string;
  icon?: number[];
  icontype: number;
  id: number;
}

export interface BuffConfig {
  data?: IBuffInfo[];
}

const buffInfoSchema: FieldSchema = [
  ["Desc", text()],
  ["Tag", text()],
  ["desc_tag", text()],
  ["icon", optionalArray("int")],
  ["icontype", int()],
  ["id", int()],
];

export const parseBuffConfig = createSimpleListParser<IBuffInfo, BuffConfig>({
  name: "buff",
  outputPath: "./json/buff.json",
  dataKey: "data",
  itemSchema: buffInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenbossbuffInfo {
  bufftype: number;
  des: string;
  extranum: string;
  id: number;
}

export interface AwakenbossbuffConfig {
  data?: IAwakenbossbuffInfo[];
}

const awakenbossbuffInfoSchema: FieldSchema = [
  ["bufftype", int()],
  ["des", text()],
  ["extranum", text()],
  ["id", int()],
];

export const parseAwakenbossbuffConfig = createSimpleListParser<IAwakenbossbuffInfo, AwakenbossbuffConfig>({
  name: "awakenbossbuff",
  outputPath: "./json/awakenbossbuff.json",
  dataKey: "data",
  itemSchema: awakenbossbuffInfoSchema,
});

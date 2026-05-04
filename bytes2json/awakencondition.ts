import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenconditionInfo {
  baseconid: number;
  des: string;
  id: number;
  typeparam: string;
}

export interface AwakenconditionConfig {
  data?: IAwakenconditionInfo[];
}

const awakenconditionInfoSchema: FieldSchema = [
  ["baseconid", int()],
  ["des", text()],
  ["id", int()],
  ["typeparam", text()],
];

export const parseAwakenconditionConfig = createSimpleListParser<IAwakenconditionInfo, AwakenconditionConfig>({
  name: "awakencondition",
  outputPath: "./json/awakencondition.json",
  dataKey: "data",
  itemSchema: awakenconditionInfoSchema,
});

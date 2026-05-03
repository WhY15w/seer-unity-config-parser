import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBoxordinaryInfo {
  id: number;
  itemid: number;
  tips: string;
}

export interface BoxordinaryConfig {
  data?: IBoxordinaryInfo[];
}

const boxordinaryInfoSchema: FieldSchema = [
  ["id", int()],
  ["itemid", int()],
  ["tips", text()],
];

export const parseBoxordinaryConfig = createSimpleListParser<IBoxordinaryInfo, BoxordinaryConfig>({
  name: "boxordinary",
  outputPath: "./json/boxordinary.json",
  dataKey: "data",
  itemSchema: boxordinaryInfoSchema,
});

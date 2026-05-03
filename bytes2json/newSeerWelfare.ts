import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewSeerWelfareInfo {
  Go: number;
  beginning: string;
  ending: string;
  id: number;
  name: string;
  redPointID: number;
  sorting: number;
  statLog: string;
  type: number;
}

export interface NewSeerWelfareConfig {
  data?: INewSeerWelfareInfo[];
}

const newSeerWelfareInfoSchema: FieldSchema = [
  ["Go", int()],
  ["beginning", text()],
  ["ending", text()],
  ["id", int()],
  ["name", text()],
  ["redPointID", int()],
  ["sorting", int()],
  ["statLog", text()],
  ["type", int()],
];

export const parseNewSeerWelfareConfig = createSimpleListParser<INewSeerWelfareInfo, NewSeerWelfareConfig>({
  name: "NewSeerWelfare",
  outputPath: "./json/NewSeerWelfare.json",
  dataKey: "data",
  itemSchema: newSeerWelfareInfoSchema,
});

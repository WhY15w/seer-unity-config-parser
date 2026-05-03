import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IJumptargetInfo {
  id: number;
  name: string;
  paras: string;
  target: number;
  type: number;
}

export interface JumptargetConfig {
  data?: IJumptargetInfo[];
}

const jumptargetInfoSchema: FieldSchema = [
  ["id", int()],
  ["name", text()],
  ["paras", text()],
  ["target", int()],
  ["type", int()],
];

export const parseJumptargetConfig = createSimpleListParser<IJumptargetInfo, JumptargetConfig>({
  name: "jumptarget",
  outputPath: "./json/jumptarget.json",
  dataKey: "data",
  itemSchema: jumptargetInfoSchema,
});

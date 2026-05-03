import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILevelConditionInfo {
  count: number;
  id: number;
  script: string;
}

export interface LevelConditionConfig {
  data?: ILevelConditionInfo[];
}

const levelConditionInfoSchema: FieldSchema = [
  ["count", int()],
  ["id", int()],
  ["script", text()],
];

export const parseLevelConditionConfig = createSimpleListParser<ILevelConditionInfo, LevelConditionConfig>({
  name: "LevelCondition",
  outputPath: "./json/LevelCondition.json",
  dataKey: "data",
  itemSchema: levelConditionInfoSchema,
});

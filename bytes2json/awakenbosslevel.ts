import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenbosslevelInfo {
  id: number;
  itemid: string;
  sceneeffect: string;
  troopid: string;
}

export interface AwakenbosslevelConfig {
  data?: IAwakenbosslevelInfo[];
}

const awakenbosslevelInfoSchema: FieldSchema = [
  ["id", int()],
  ["itemid", text()],
  ["sceneeffect", text()],
  ["troopid", text()],
];

export const parseAwakenbosslevelConfig = createSimpleListParser<IAwakenbosslevelInfo, AwakenbosslevelConfig>({
  name: "awakenbosslevel",
  outputPath: "./json/awakenbosslevel.json",
  dataKey: "data",
  itemSchema: awakenbosslevelInfoSchema,
});

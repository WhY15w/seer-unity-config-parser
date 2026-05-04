import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAwakenlevelInfo {
  conditionid: string;
  dailybattlerecordinfo: string;
  id: number;
  monsterdes: string;
  passrecordinfo: string;
  sceneeffect: string;
  time: number;
  troopid: string;
}

export interface AwakenlevelConfig {
  data?: IAwakenlevelInfo[];
}

const awakenlevelInfoSchema: FieldSchema = [
  ["conditionid", text()],
  ["dailybattlerecordinfo", text()],
  ["id", int()],
  ["monsterdes", text()],
  ["passrecordinfo", text()],
  ["sceneeffect", text()],
  ["time", int()],
  ["troopid", text()],
];

export const parseAwakenlevelConfig = createSimpleListParser<IAwakenlevelInfo, AwakenlevelConfig>({
  name: "awakenlevel",
  outputPath: "./json/awakenlevel.json",
  dataKey: "data",
  itemSchema: awakenlevelInfoSchema,
});

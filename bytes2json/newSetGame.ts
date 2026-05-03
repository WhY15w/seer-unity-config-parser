import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewSetGameInfo {
  axis: number;
  conditionDesc: string;
  effectType: number;
  extraParam: number;
  id: number;
  levelid: number;
  petName: string;
  petType: number;
  petid: number;
  value: number;
}

export interface NewSetGameConfig {
  data?: INewSetGameInfo[];
}

const newSetGameInfoSchema: FieldSchema = [
  ["axis", int()],
  ["conditionDesc", text()],
  ["effectType", int()],
  ["extraParam", int()],
  ["id", int()],
  ["levelid", int()],
  ["petName", text()],
  ["petType", int()],
  ["petid", int()],
  ["value", int()],
];

export const parseNewSetGameConfig = createSimpleListParser<INewSetGameInfo, NewSetGameConfig>({
  name: "newSetGame",
  outputPath: "./json/newSetGame.json",
  dataKey: "data",
  itemSchema: newSetGameInfoSchema,
});

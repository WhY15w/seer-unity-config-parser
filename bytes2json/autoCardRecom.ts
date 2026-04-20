import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutoCardRecomInfo {
  MaCardID: string;
  petCardId: string;
  title: string;
  classId: number;
  id: number;
  petBG: number;
}

export interface AutoCardRecomConfig {
  data?: IAutoCardRecomInfo[];
}

const autoCardRecomInfoSchema: FieldSchema = [
  ["MaCardID", text()],
  ["classId", int()],
  ["id", int()],
  ["petBG", int()],
  ["petCardId", text()],
  ["title", text()],
];

export const parseAutoCardRecomConfig = createSimpleListParser<
  IAutoCardRecomInfo,
  AutoCardRecomConfig
>({
  name: "autoCardRecom",
  outputPath: "./json/autoCardRecom.json",
  dataKey: "data",
  itemSchema: autoCardRecomInfoSchema,
});

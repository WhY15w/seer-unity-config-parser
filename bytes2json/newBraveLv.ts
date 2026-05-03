import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewBraveLvInfo {
  id: number;
  stepname?: string[];
  stepnum: number;
  storehouse: string;
}

export interface NewBraveLvConfig {
  data?: INewBraveLvInfo[];
}

const newBraveLvInfoSchema: FieldSchema = [
  ["id", int()],
  ["stepname", optionalArray("text")],
  ["stepnum", int()],
  ["storehouse", text()],
];

export const parseNewBraveLvConfig = createSimpleListParser<INewBraveLvInfo, NewBraveLvConfig>({
  name: "newBraveLv",
  outputPath: "./json/newBraveLv.json",
  dataKey: "data",
  itemSchema: newBraveLvInfoSchema,
});

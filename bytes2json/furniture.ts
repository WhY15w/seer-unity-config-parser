import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IFurnitureInfo {
  func: number;
  funcIdentity: number;
  funcParam: string;
  id: number;
  name: string;
  type: number;
  vipOnly: number;
}

export interface FurnitureConfig {
  data?: IFurnitureInfo[];
}

const furnitureInfoSchema: FieldSchema = [
  ["func", int()],
  ["funcIdentity", int()],
  ["funcParam", text()],
  ["id", int()],
  ["name", text()],
  ["type", int()],
  ["vipOnly", int()],
];

export const parseFurnitureConfig = createSimpleListParser<IFurnitureInfo, FurnitureConfig>({
  name: "furniture",
  outputPath: "./json/furniture.json",
  dataKey: "data",
  itemSchema: furnitureInfoSchema,
});

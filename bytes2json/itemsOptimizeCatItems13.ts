import {
  createSimpleListParser,
  text,
  int,
  float,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IItemsItem {
  Name: string;
  type: string;
  Bean: number;
  catID: number;
  Hide: number;
  ID: number;
  isSpecial: number;
  Max: number;
  purpose: number;
  Sort: number;
  speed: number;
  UseMax: number;
  VipOnly: number;
  wd: number;
}

export interface IRootInterface {
  items?: IItemsItem[];
}

const itemsItemSchema: FieldSchema = [
  ["Bean", int()],
  ["Hide", int()],
  ["ID", int()],
  ["Max", int()],
  ["Name", text()],
  ["Sort", int()],
  ["UseMax", int()],
  ["VipOnly", int()],
  ["catID", int()],
  ["isSpecial", int()],
  ["purpose", int()],
  ["speed", float()],
  ["type", text()],
  ["wd", int()],
];

export const parseItemsOptimizeCatItems13Config = createSimpleListParser<
  IItemsItem,
  IRootInterface
>({
  name: "itemsOptimizeCatItems13",
  outputPath: "./json/itemsOptimizeCatItems13.json",
  dataKey: "items",
  itemSchema: itemsItemSchema,
});

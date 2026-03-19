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
  actionDir: number;
  Bean: number;
  catID: number;
  Hide: number;
  ID: number;
  isSpecial: number;
  LifeTime: number;
  Max: number;
  Price: number;
  purpose: number;
  RepairPrice: number;
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
  ["LifeTime", int()],
  ["Max", int()],
  ["Name", text()],
  ["Price", int()],
  ["RepairPrice", int()],
  ["Sort", int()],
  ["UseMax", int()],
  ["VipOnly", int()],
  ["actionDir", int()],
  ["catID", int()],
  ["isSpecial", int()],
  ["purpose", int()],
  ["speed", float()],
  ["type", text()],
  ["wd", int()],
];

export const parseItemsOptimizeCatItems1Config = createSimpleListParser<
  IItemsItem,
  IRootInterface
>({
  name: "itemsOptimizeCatItems1",
  outputPath: "./json/itemsOptimizeCatItems1.json",
  dataKey: "items",
  itemSchema: itemsItemSchema,
});

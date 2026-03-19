import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  float,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IItemItem {
  name: string;
  suitdes: string;
  cloths?: number[];
  id: number;
  transform: number;
  tranSpeed: number;
}

export interface IRoot {
  item: IItemItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const itemSchema: FieldSchema = [
  ["cloths", optionalArray("int")],
  ["id", int()],
  ["name", text()],
  ["suitdes", text()],
  ["tranSpeed", float()],
  ["transform", int()],
];

export const parseSuitConfig = createConfigParser<IRootInterface>({
  name: "suit",
  outputPath: "./json/suit.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const items: IItemItem[] = [];
      if (reader.boolean()) {
        const num = reader.int();
        for (let i = 0; i < num; i++) {
          items.push(parseBySchema<IItemItem>(reader, itemSchema));
        }
      }
      result.root = { item: items };
    }
    return result;
  },
});

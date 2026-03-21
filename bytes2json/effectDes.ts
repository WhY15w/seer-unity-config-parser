import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IItemItem {
  desc: string;
  kinddes: string;
  link: string;
  monster: string;
  icon: number;
  id: number;
  kind: number;
  tab: number;
}

export interface IRoot {
  item?: IItemItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const itemSchema: FieldSchema = [
  ["desc", text()],
  ["icon", int()],
  ["id", int()],
  ["kind", int()],
  ["kinddes", text()],
  ["link", text()],
  ["monster", text()],
  ["tab", int()],
];

const rootSchema: FieldSchema = [["item", optionalArrayStruct(itemSchema)]];

export const parseEffectDesConfig = createConfigParser<IRootInterface>({
  name: "effectDes",
  outputPath: "./json/effectDes.json",
  parse: (reader) => {
    const result: IRootInterface = {};

    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }

    return result;
  },
});

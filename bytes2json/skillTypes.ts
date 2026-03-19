import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IItemItem {
  att: string;
  cn: string;
  en?: string[];
  id: number;
  is_dou: number;
}

export interface IRoot {
  item?: IItemItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const itemSchema: FieldSchema = [
  ["att", text()],
  ["cn", text()],
  ["en", optionalArray("text")],
  ["id", int()],
  ["is_dou", int()],
];

const rootSchema: FieldSchema = [["item", optionalArrayStruct(itemSchema)]];

export const parseSkillTypesConfig = createConfigParser<IRootInterface>({
  name: "skillTypes",
  outputPath: "./json/skillTypes.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return result;
  },
});

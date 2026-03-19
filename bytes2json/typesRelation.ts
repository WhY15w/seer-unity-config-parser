import {
  createConfigParser,
  parseBySchema,
  text,
  float,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IOpponentItem {
  type: string;
  multiple: number;
}

export interface IRelationItem {
  type: string;
  opponent?: IOpponentItem[];
}

export interface IRoot {
  relation?: IRelationItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const opponentItemSchema: FieldSchema = [
  ["multiple", float()],
  ["type", text()],
];

const relationItemSchema: FieldSchema = [
  ["opponent", optionalArrayStruct(opponentItemSchema)],
  ["type", text()],
];

const rootSchema: FieldSchema = [
  ["relation", optionalArrayStruct(relationItemSchema)],
];

export const parseTypesRelationConfig = createConfigParser<IRootInterface>({
  name: "typesRelation",
  outputPath: "./json/typesRelation.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return result;
  },
});

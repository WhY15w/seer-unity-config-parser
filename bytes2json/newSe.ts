import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  optionalObject,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewSeIdxItem {
  Args: string;
  Des: string;
  Desc: string;
  Intro: string;
  AdditionNum: number;
  AdditionType: number;
  Eid: number;
  Idx: number;
  ItemId: number;
  StarLevel: number;
  Stat: number;
}

export interface INewSe {
  NewSeIdx?: INewSeIdxItem[];
}

export interface INewSeRoot {
  NewSe?: INewSe;
}

const newSeIdxItemSchema: FieldSchema = [
  ["AdditionNum", int()],
  ["AdditionType", int()],
  ["Args", text()],
  ["Des", text()],
  ["Desc", text()],
  ["Eid", int()],
  ["Idx", int()],
  ["Intro", text()],
  ["ItemId", int()],
  ["StarLevel", int()],
  ["Stat", int()],
];

const newSeSchema: FieldSchema = [
  ["NewSeIdx", optionalArrayStruct(newSeIdxItemSchema)],
];

const rootSchema: FieldSchema = [["NewSe", optionalObject(newSeSchema)]];

export const parseNewSeConfig = createConfigParser<INewSeRoot>({
  name: "new_se",
  outputPath: "./json/new_se.json",
  parse: (reader) => parseBySchema<INewSeRoot>(reader, rootSchema),
});

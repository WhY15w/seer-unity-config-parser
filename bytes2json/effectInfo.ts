import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

interface IEffectItem {
  analyze: string;
  argsNum: number;
  id: number;
  info: string;
  key: string;
  param?: number[];
  type: number;
}

interface IParamTypeItem {
  id: number;
  params: string;
}

interface IEffectInfoRoot {
  Effect?: IEffectItem[];
  ParamType?: IParamTypeItem[];
}

export interface EffectInfoConfig {
  root?: IEffectInfoRoot;
}

const effectItemSchema: FieldSchema = [
  ["analyze", text()],
  ["argsNum", int()],
  ["id", int()],
  ["info", text()],
  ["key", text()],
  ["param", optionalArray("int")],
  ["type", int()],
];

const paramTypeItemSchema: FieldSchema = [
  ["id", int()],
  ["params", text()],
];

const effectInfoRootSchema: FieldSchema = [
  ["Effect", optionalArrayStruct(effectItemSchema)],
  ["ParamType", optionalArrayStruct(paramTypeItemSchema)],
];

export const parseEffectInfoConfig = createConfigParser<EffectInfoConfig>({
  name: "effectInfo",
  outputPath: "./json/effectInfo.json",
  parse: (reader) => {
    if (!reader.boolean()) return {};
    return {
      root: parseBySchema<IEffectInfoRoot>(reader, effectInfoRootSchema),
    };
  },
});

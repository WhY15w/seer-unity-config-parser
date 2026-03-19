import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IEffectItem {
  analyze: string;
  args: string;
  come: string;
  des?: string[];
  tag?: string[];
  tips: string;
  kind?: number[];
  petId?: number[];
  specificId?: number[];
  effectId: number;
  iconId: number;
  Id: number;
  intensify: number;
  isAdv: number;
  label: number;
  limitedType: number;
  target: number;
  to: number;
  type: number;
}

export interface IRoot {
  effect?: IEffectItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const effectItemSchema: FieldSchema = [
  ["Id", int()],
  ["analyze", text()],
  ["args", text()],
  ["come", text()],
  ["des", optionalArray("text")],
  ["effectId", int()],
  ["iconId", int()],
  ["intensify", int()],
  ["isAdv", int()],
  ["kind", optionalArray("int")],
  ["label", int()],
  ["limitedType", int()],
  ["petId", optionalArray("int")],
  ["specificId", optionalArray("int")],
  ["tag", optionalArray("text")],
  ["target", int()],
  ["tips", text()],
  ["to", int()],
  ["type", int()],
];

const rootSchema: FieldSchema = [
  ["effect", optionalArrayStruct(effectItemSchema)],
];

export const parseEffectIconConfig = createConfigParser<IRootInterface>({
  name: "effectIcon",
  outputPath: "./json/effectIcon.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return result;
  },
});

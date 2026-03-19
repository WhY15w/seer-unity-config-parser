import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMintMarkItem {
  Des: string;
  EffectDes: string;
  Connect: number;
  Arg?: number[];
  BaseAttriValue?: number[];
  ExtraAttriValue?: number[];
  MaxAttriValue?: number[];
  MonsterID?: number[];
  MoveID?: number[];
  Grade: number;
  Hide: number;
  ID: number;
  Level: number;
  Max: number;
  MintmarkClass: number;
  Quality: number;
  Rare: number;
  Rarity: number;
  TotalConsume: number;
  Type: number;
}

export interface IMintmarkClassItem {
  ClassName: string;
  ID: number;
}

export interface IMintMarks {
  MintMark?: IMintMarkItem[];
  MintmarkClass?: IMintmarkClassItem[];
}

export interface IRootInterface {
  MintMarks?: IMintMarks;
}

const mintMarkItemSchema: FieldSchema = [
  ["Arg", optionalArray("int")],
  ["BaseAttriValue", optionalArray("int")],
  ["Connect", int()],
  ["Des", text()],
  ["EffectDes", text()],
  ["ExtraAttriValue", optionalArray("int")],
  ["Grade", int()],
  ["Hide", int()],
  ["ID", int()],
  ["Level", int()],
  ["Max", int()],
  ["MaxAttriValue", optionalArray("int")],
  ["MintmarkClass", int()],
  ["MonsterID", optionalArray("int")],
  ["MoveID", optionalArray("int")],
  ["Quality", int()],
  ["Rare", int()],
  ["Rarity", int()],
  ["TotalConsume", int()],
  ["Type", int()],
];

const mintmarkClassItemSchema: FieldSchema = [
  ["ClassName", text()],
  ["ID", int()],
];

const mintMarksSchema: FieldSchema = [
  ["MintMark", optionalArrayStruct(mintMarkItemSchema)],
  ["MintmarkClass", optionalArrayStruct(mintmarkClassItemSchema)],
];

export const parseMintmarkConfig = createConfigParser<IRootInterface>({
  name: "mintmark",
  outputPath: "./json/mintmark.json",
  parse: (reader) => {
    const root: IRootInterface = {};
    if (reader.boolean()) {
      root.MintMarks = parseBySchema<IMintMarks>(reader, mintMarksSchema);
    }
    return root;
  },
});

import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMoveItem {
  info: string;
  Name: string;
  FriendSideEffect?: number[];
  FriendSideEffectArg?: number[];
  SideEffect?: number[];
  SideEffectArg?: number[];
  Accuracy: number;
  AtkNum: number;
  AtkType: number;
  Category: number;
  CritRate: number;
  ID: number;
  MaxPP: number;
  MonID: number;
  MustHit: number;
  ordinary: number;
  Power: number;
  Priority: number;
  Type: number;
}

export interface IMoves {
  _text: string;
  Move?: IMoveItem[];
}

export interface IMovesTbl {
  Moves?: IMoves;
}

export interface IMovesRoot {
  MovesTbl?: IMovesTbl;
}

const moveItemSchema: FieldSchema = [
  ["Accuracy", int()],
  ["AtkNum", int()],
  ["AtkType", int()],
  ["Category", int()],
  ["CritRate", int()],
  ["FriendSideEffect", optionalArray("int")],
  ["FriendSideEffectArg", optionalArray("int")],
  ["ID", int()],
  ["MaxPP", int()],
  ["MonID", int()],
  ["MustHit", int()],
  ["Name", text()],
  ["Power", int()],
  ["Priority", int()],
  ["SideEffect", optionalArray("int")],
  ["SideEffectArg", optionalArray("int")],
  ["Type", int()],
  ["info", text()],
  ["ordinary", int()],
];

const movesSchema: FieldSchema = [
  ["Move", optionalArrayStruct(moveItemSchema)],
  ["_text", text()],
];

const movesTblSchema: FieldSchema = [
  ["Moves", { kind: "optionalObject", schema: movesSchema }],
];

export const parseMovesConfig = createConfigParser<IMovesRoot>({
  name: "moves",
  outputPath: "./json/moves.json",
  parse: (reader) => {
    const result: IMovesRoot = {};
    if (reader.boolean()) {
      result.MovesTbl = parseBySchema<IMovesTbl>(reader, movesTblSchema);
    }
    return result;
  },
});

import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalObject,
  optionalArrayStruct,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdvEffect {
  Des: string;
  Id: number;
}

export interface IExMove {
  ExtraMoves: number;
}

export interface IRace {
  NewRace?: number[];
  OldRace?: number[];
}

export interface ISpMove {
  SpMoves?: number[];
}

export interface IAdvances {
  AdvEffect?: IAdvEffect;
  exMove?: IExMove;
  Race?: IRace;
  spMove?: ISpMove;
  AdvType: number;
  MonsterId: number;
}

export interface ITaskItem {
  Advances?: IAdvances;
  ID: number;
  NewEffID: number;
  OldEffID: number;
}

export interface IRoot {
  Task?: ITaskItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const advEffectSchema: FieldSchema = [
  ["Des", text()],
  ["Id", int()],
];

const exMoveSchema: FieldSchema = [["ExtraMoves", int()]];

const raceSchema: FieldSchema = [
  ["NewRace", optionalArray("int")],
  ["OldRace", optionalArray("int")],
];

const spMoveSchema: FieldSchema = [["SpMoves", optionalArray("int")]];

const advancesSchema: FieldSchema = [
  ["AdvEffect", optionalObject(advEffectSchema)],
  ["AdvType", int()],
  ["MonsterId", int()],
  ["Race", optionalObject(raceSchema)],
  ["exMove", optionalObject(exMoveSchema)],
  ["spMove", optionalObject(spMoveSchema)],
];

const taskItemSchema: FieldSchema = [
  ["Advances", optionalObject(advancesSchema)],
  ["ID", int()],
  ["NewEffID", int()],
  ["OldEffID", int()],
];

const rootSchema: FieldSchema = [["Task", optionalArrayStruct(taskItemSchema)]];

export const parseAwakenDetail = createConfigParser<IRootInterface>({
  name: "awakendetail",
  outputPath: "./json/awakendetail.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return result;
  },
});

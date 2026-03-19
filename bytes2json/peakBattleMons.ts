import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  optionalObject,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWeeklyIDItem {
  HomeAdditionMon: number;
  NewSeIcon: string;
}

export interface IPeakBtGlobalRule {
  WeeklyID?: IWeeklyIDItem[];
}

export interface IVirtualBattle {
  PeakBtGlobalRule?: IPeakBtGlobalRule;
}

export interface IRootInterface {
  VirtualBattle?: IVirtualBattle;
}

const weeklyIDItemSchema: FieldSchema = [
  ["HomeAdditionMon", int()],
  ["NewSeIcon", text()],
];

const peakBtGlobalRuleSchema: FieldSchema = [
  ["WeeklyID", optionalArrayStruct(weeklyIDItemSchema)],
];

const virtualBattleSchema: FieldSchema = [
  ["PeakBtGlobalRule", optionalObject(peakBtGlobalRuleSchema)],
];

export const parsePeakBattleMonsConfig = createConfigParser<IRootInterface>({
  name: "peak_battle_mons",
  outputPath: "./json/peak_battle_mons.json",
  parse: (reader) => {
    const root: IRootInterface = {};

    if (reader.boolean()) {
      root.VirtualBattle = parseBySchema<IVirtualBattle>(
        reader,
        virtualBattleSchema
      );
    }

    return root;
  },
});

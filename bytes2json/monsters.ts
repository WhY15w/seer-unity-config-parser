import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalObject,
  optionalArrayStruct,
  custom,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";
import type { BytesReader } from "../utils/BytesReader";

export interface ISpMoveItem {
  Id: number;
  Rec: number;
  Tag: number;
  tag: number;
}

export interface IMoveItem {
  Id: number;
  LearningLv: number;
  Rec: number;
  Tag: number;
}

export interface ILearnableMoves {
  AdvMove?: ISpMoveItem[];
  Move?: IMoveItem[];
  SpMove?: ISpMoveItem[];
}

export interface IMonsterItem {
  DefName: string;
  ExtraMoves?: ILearnableMoves;
  LearnableMoves?: ILearnableMoves;
  Move?: IMoveItem;
  ShowExtraMoves?: ILearnableMoves;
  SpExtraMoves?: ILearnableMoves;
  Atk: number;
  CharacterAttrParam: number;
  Combo: number;
  Def: number;
  HP: number;
  SpAtk: number;
  SpDef: number;
  Spd: number;
  Support: number;
  EvolvesTo: number;
  EvolvFlag: number;
  EvolvingLv: number;
  ID: number;
  RealId: number;
  PetClass: number;
  Type: number;
  Vip: number;
  Gender: number;
  FreeForbidden: number;
  Transform: number;
  isFlyPet: number;
  isRidePet: number;
}

export interface IMonsters {
  Monster: IMonsterItem[];
}

export interface IRootInterface {
  Monsters: IMonsters;
}

const spMoveItemSchema: FieldSchema = [
  ["Id", int()],
  ["Rec", int()],
  ["Tag", int()],
  ["tag", int()],
];

const moveItemSchema: FieldSchema = [
  ["Id", int()],
  ["LearningLv", int()],
  ["Rec", int()],
  ["Tag", int()],
];

const learnableMovesSchema: FieldSchema = [
  ["AdvMove", optionalArrayStruct(spMoveItemSchema)],
  ["Move", optionalArrayStruct(moveItemSchema)],
  ["SpMove", optionalArrayStruct(spMoveItemSchema)],
];

/**
 * 对于 Move 字段，它是 boolean + parseSingleObject（非数组），
 * 使用 custom 来处理这种特殊模式。
 */
function optionalSingleItem(schema: FieldSchema) {
  return custom((reader: BytesReader) => {
    if (reader.boolean()) {
      return parseBySchema(reader, schema);
    }
    return undefined;
  });
}

const monsterItemSchema: FieldSchema = [
  ["Atk", int()],
  ["CharacterAttrParam", int()],
  ["Combo", int()],
  ["Def", int()],
  ["DefName", text()],
  ["EvolvFlag", int()],
  ["EvolvesTo", int()],
  ["EvolvingLv", int()],
  ["ExtraMoves", optionalObject(learnableMovesSchema)],
  ["FreeForbidden", int()],
  ["Gender", int()],
  ["HP", int()],
  ["ID", int()],
  ["LearnableMoves", optionalObject(learnableMovesSchema)],
  ["Move", optionalSingleItem(moveItemSchema)],
  ["PetClass", int()],
  ["RealId", int()],
  ["ShowExtraMoves", optionalObject(learnableMovesSchema)],
  ["SpAtk", int()],
  ["SpDef", int()],
  ["SpExtraMoves", optionalObject(learnableMovesSchema)],
  ["Spd", int()],
  ["Support", int()],
  ["Transform", int()],
  ["Type", int()],
  ["Vip", int()],
  ["isFlyPet", int()],
  ["isRidePet", int()],
];

export const parseMonstersConfig = createConfigParser<IRootInterface>({
  name: "monsters",
  outputPath: "./json/monsters.json",
  parse: (reader) => {
    const root: IRootInterface = { Monsters: { Monster: [] } };

    if (reader.boolean()) {
      if (reader.boolean()) {
        const count = reader.int();
        console.log("monstersCount:", count);
        root.Monsters.Monster = Array.from({ length: count }, () =>
          parseBySchema<IMonsterItem>(reader, monsterItemSchema)
        );
      }
    }

    return root;
  },
});

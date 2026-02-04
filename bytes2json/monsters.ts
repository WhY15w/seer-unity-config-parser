import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

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

function parseISpMoveItem(reader: BytesReader): ISpMoveItem {
  return {
    Id: reader.int(),
    Rec: reader.int(),
    Tag: reader.int(),
    tag: reader.int(),
  };
}

function parseIMoveItem(reader: BytesReader): IMoveItem {
  return {
    Id: reader.int(),
    LearningLv: reader.int(),
    Rec: reader.int(),
    Tag: reader.int(),
  };
}

function parseILearnableMoves(reader: BytesReader): ILearnableMoves {
  const res: ILearnableMoves = {};
  if (reader.boolean()) {
    const num = reader.int();
    res.AdvMove = Array.from({ length: num }, () => parseISpMoveItem(reader));
  }
  if (reader.boolean()) {
    const num = reader.int();
    res.Move = Array.from({ length: num }, () => parseIMoveItem(reader));
  }
  if (reader.boolean()) {
    const num = reader.int();
    res.SpMove = Array.from({ length: num }, () => parseISpMoveItem(reader));
  }
  return res;
}

function parseIMonsterItem(reader: BytesReader): IMonsterItem {
  const item: IMonsterItem = {
    Atk: reader.int(),
    CharacterAttrParam: reader.int(),
    Combo: reader.int(),
    Def: reader.int(),
    DefName: reader.text(),
    EvolvFlag: reader.int(),
    EvolvesTo: reader.int(),
    EvolvingLv: reader.int(),
    ExtraMoves: reader.boolean() ? parseILearnableMoves(reader) : undefined,
    FreeForbidden: reader.int(),
    Gender: reader.int(),
    HP: reader.int(),
    ID: reader.int(),
    LearnableMoves: reader.boolean() ? parseILearnableMoves(reader) : undefined,
    Move: reader.boolean() ? parseIMoveItem(reader) : undefined,
    PetClass: reader.int(),
    RealId: reader.int(),
    ShowExtraMoves: reader.boolean() ? parseILearnableMoves(reader) : undefined,
    SpAtk: reader.int(),
    SpDef: reader.int(),
    SpExtraMoves: reader.boolean() ? parseILearnableMoves(reader) : undefined,
    Spd: reader.int(),
    Support: reader.int(),
    Transform: reader.int(),
    Type: reader.int(),
    Vip: reader.int(),
    isFlyPet: reader.int(),
    isRidePet: reader.int(),
  };

  return item;
}

function parseIMonsters(reader: BytesReader): IMonsters {
  const monsters: IMonsterItem[] = [];
  if (reader.boolean()) {
    const count = reader.int();
    console.log("monstersCount:", count);
    for (let i = 0; i < count; i++) {
      monsters.push(parseIMonsterItem(reader));
    }
  }
  return { Monster: monsters };
}

export async function parseMonstersConfig(
  filePath: string,
  maxParse?: number
): Promise<IRootInterface> {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const reader = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const root: IRootInterface = { Monsters: { Monster: [] } };

  if (reader.boolean()) {
    root.Monsters = parseIMonsters(reader);
  }

  saveAsJson(root, "./json/monsters.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

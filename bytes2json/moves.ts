import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

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

/**
 * 入口解析函数
 */
export function parseMovesConfig(filePath: string): IMovesRoot {
  const result: IMovesRoot = {};
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const reader = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const hasMovesTbl = reader.boolean();
  if (hasMovesTbl) {
    result.MovesTbl = parseIMovesTbl(reader);
  }

  saveAsJson(result, "./json/moves.json");
  return result;
}

function parseIMovesTbl(reader: BytesReader): IMovesTbl {
  const tbl: IMovesTbl = {};
  const hasMoves = reader.boolean();
  if (hasMoves) {
    tbl.Moves = parseIMoves(reader);
  }
  return tbl;
}

function parseIMoves(reader: BytesReader): IMoves {
  const moves: IMoves = { _text: "" };

  const hasMoveArray = reader.boolean();
  if (hasMoveArray) {
    const count = reader.int();
    moves.Move = new Array(count);
    for (let i = 0; i < count; i++) {
      moves.Move[i] = parseIMoveItem(reader);
    }
  }

  moves._text = reader.text();
  return moves;
}

function parseIMoveItem(reader: BytesReader): IMoveItem {
  const item = {} as IMoveItem;

  item.Accuracy = reader.int();
  item.AtkNum = reader.int();
  item.AtkType = reader.int();
  item.Category = reader.int();
  item.CritRate = reader.int();

  if (reader.boolean()) {
    const len = reader.int();
    item.FriendSideEffect = new Array(len);
    for (let i = 0; i < len; i++) {
      item.FriendSideEffect[i] = reader.int();
    }
  }

  if (reader.boolean()) {
    const len = reader.int();
    item.FriendSideEffectArg = new Array(len);
    for (let i = 0; i < len; i++) {
      item.FriendSideEffectArg[i] = reader.int();
    }
  }

  item.ID = reader.int();
  item.MaxPP = reader.int();
  item.MonID = reader.int();
  item.MustHit = reader.int();
  item.Name = reader.text();
  item.Power = reader.int();
  item.Priority = reader.int();

  if (reader.boolean()) {
    const len = reader.int();
    item.SideEffect = new Array(len);
    for (let i = 0; i < len; i++) {
      item.SideEffect[i] = reader.int();
    }
  }

  if (reader.boolean()) {
    const len = reader.int();
    item.SideEffectArg = new Array(len);
    for (let i = 0; i < len; i++) {
      item.SideEffectArg[i] = reader.int();
    }
  }

  item.Type = reader.int();
  item.info = reader.text();
  item.ordinary = reader.int();

  return item;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

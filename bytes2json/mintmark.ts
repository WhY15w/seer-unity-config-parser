import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

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

function parseIntArray(reader: BytesReader): number[] | undefined {
  const count = reader.int();
  if (count <= 0) return undefined;
  return Array.from({ length: count }, () => reader.int());
}

function parseIMintMarkItem(reader: BytesReader): IMintMarkItem {
  const item: IMintMarkItem = {
    Des: "",
    EffectDes: "",
    Connect: 0,

    Grade: 0,
    Hide: 0,
    ID: 0,
    Level: 0,
    Max: 0,
    MintmarkClass: 0,
    Quality: 0,
    Rare: 0,
    Rarity: 0,
    TotalConsume: 0,
    Type: 0,
  };

  // Arg
  if (reader.boolean()) {
    item.Arg = parseIntArray(reader);
  }

  // BaseAttriValue
  if (reader.boolean()) {
    item.BaseAttriValue = parseIntArray(reader);
  }

  item.Connect = reader.int();
  // Des
  item.Des = reader.text();

  // EffectDes
  item.EffectDes = reader.text();

  // ExtraAttriValue
  if (reader.boolean()) {
    item.ExtraAttriValue = parseIntArray(reader);
  }

  item.Grade = reader.int();
  item.Hide = reader.int();
  item.ID = reader.int();
  item.Level = reader.int();
  item.Max = reader.int();

  // MaxAttriValue
  if (reader.boolean()) {
    item.MaxAttriValue = parseIntArray(reader);
  }

  item.MintmarkClass = reader.int();

  // MonsterID
  if (reader.boolean()) {
    item.MonsterID = parseIntArray(reader);
  }

  // MoveID
  if (reader.boolean()) {
    item.MoveID = parseIntArray(reader);
  }

  item.Quality = reader.int();
  item.Rare = reader.int();
  item.Rarity = reader.int();
  item.TotalConsume = reader.int();
  item.Type = reader.int();

  return item;
}

function parseIMintmarkClassItem(reader: BytesReader): IMintmarkClassItem {
  return {
    ClassName: reader.text(),
    ID: reader.int(),
  };
}

function parseIMintMarks(reader: BytesReader): IMintMarks {
  const res: IMintMarks = {};

  // MintMark
  if (reader.boolean()) {
    const count = reader.int();
    if (count > 0) {
      res.MintMark = Array.from({ length: count }, () =>
        parseIMintMarkItem(reader)
      );
    }
  }

  // MintmarkClass
  if (reader.boolean()) {
    const count = reader.int();
    if (count > 0) {
      res.MintmarkClass = Array.from({ length: count }, () =>
        parseIMintmarkClassItem(reader)
      );
    }
  }

  return res;
}

export async function parseMintmarkConfig(
  filePath: string
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

  const root: IRootInterface = {};

  if (reader.boolean()) {
    root.MintMarks = parseIMintMarks(reader);
  }

  saveAsJson(root, "./json/mintmark.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

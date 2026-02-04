import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IRankItem {
  Desc: string;
  Lv: number;
}

export interface IEquipItem {
  Desc: string;
  Name: string;
  Rank?: IRankItem[];
  ItemID: number;
  Quality: number;
  SuitID: number;
}

export interface IEquips {
  Equip: IEquipItem[];
}

export interface IRootInterface {
  Equips?: IEquips;
}

function parseIRankItem(reader: BytesReader): IRankItem {
  const Desc = reader.text();
  const Lv = reader.int();

  return { Desc, Lv };
}

function parseIEquipItem(reader: BytesReader): IEquipItem {
  const Desc = reader.text();
  const ItemID = reader.int();
  const Name = reader.text();
  const Quality = reader.int();

  let Rank: IRankItem[] | undefined;
  if (reader.boolean()) {
    const num = reader.int();
    Rank = Array.from({ length: num }, () => parseIRankItem(reader));
  }

  const SuitID = reader.int();

  return { Desc, Name, Rank, ItemID, Quality, SuitID };
}

function parseIEquips(reader: BytesReader): IEquips {
  const equips: IEquipItem[] = [];
  if (reader.boolean()) {
    const num = reader.int();
    for (let i = 0; i < num; i++) {
      equips.push(parseIEquipItem(reader));
    }
  }
  return { Equip: equips };
}

export async function parseEquipConfig(
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

  const rootInterface: IRootInterface = {};

  if (reader.boolean()) {
    rootInterface.Equips = parseIEquips(reader);
  }

  saveAsJson(rootInterface, "./json/equip.json");
  return rootInterface;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

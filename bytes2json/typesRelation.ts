import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IOpponentItem {
  type: string;
  multiple: number;
}

export interface IRelationItem {
  type: string;
  opponent?: IOpponentItem[];
}

export interface IRoot {
  relation?: IRelationItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

function parseIOpponentItem(reader: BytesReader): IOpponentItem {
  const multiple = reader.float();
  const type = reader.text();

  return { type, multiple };
}

function parseIRelationItem(reader: BytesReader): IRelationItem {
  let opponent: IOpponentItem[] | undefined;

  if (reader.boolean()) {
    const num = reader.int();
    opponent = Array.from({ length: num }, () => parseIOpponentItem(reader));
  }

  const type = reader.text();

  return { type, opponent };
}

function parseIRoot(reader: BytesReader): IRoot {
  let relation: IRelationItem[] | undefined;

  if (reader.boolean()) {
    const num = reader.int();
    relation = Array.from({ length: num }, () => parseIRelationItem(reader));
  }

  return { relation };
}

export async function parseTypesRelationConfig(
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

  const rootInterface: IRootInterface = {};

  if (reader.boolean()) {
    rootInterface.root = parseIRoot(reader);
  }

  saveAsJson(rootInterface, "./json/typesRelation.json");
  return rootInterface;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

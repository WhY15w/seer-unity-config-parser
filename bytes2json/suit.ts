import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IItemItem {
  name: string;
  suitdes: string;
  cloths?: number[];
  id: number;
  transform: number;
  tranSpeed: number;
}

export interface IRoot {
  item: IItemItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

function parseIItemItem(reader: BytesReader): IItemItem {
  let cloths: number[] | undefined;

  if (reader.boolean()) {
    const num = reader.int();
    cloths = Array.from({ length: num }, () => reader.int());
  }

  const id = reader.int();
  const name = reader.text();
  const suitdes = reader.text();
  const tranSpeed = reader.float();
  const transform = reader.int();

  return { name, suitdes, cloths, id, transform, tranSpeed };
}

function parseIRoot(reader: BytesReader): IRoot {
  const items: IItemItem[] = [];
  if (reader.boolean()) {
    const num = reader.int();
    for (let i = 0; i < num; i++) {
      items.push(parseIItemItem(reader));
    }
  }
  return { item: items };
}

export async function parseSuitConfig(
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
    rootInterface.root = parseIRoot(reader);
  }

  saveAsJson(rootInterface, "./json/suit.json");
  return rootInterface;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

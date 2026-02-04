import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IItemItem {
  att: string;
  cn: string;
  en?: string[];
  id: number;
  is_dou: number;
}

export interface IRoot {
  item?: IItemItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

function parseIItemItem(reader: BytesReader): IItemItem {
  const item: IItemItem = {
    att: reader.text(),
    cn: reader.text(),
    id: 0,
    is_dou: 0,
  };

  // en?: string[]
  if (reader.boolean()) {
    const num = reader.int();
    item.en = Array.from({ length: num }, () => reader.text());
  }

  item.id = reader.int();
  item.is_dou = reader.int();

  return item;
}

function parseIRoot(reader: BytesReader): IRoot {
  const root: IRoot = {};

  if (reader.boolean()) {
    const count = reader.int();
    root.item = Array.from({ length: count }, () => parseIItemItem(reader));
  }

  return root;
}

export async function parseSkillTypesConfig(
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
    root.root = parseIRoot(reader);
  }

  saveAsJson(root, "./json/skillTypes.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

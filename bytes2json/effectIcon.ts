import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IEffectItem {
  analyze: string;
  args: string;
  come: string;
  des?: string[];
  tag?: string[];
  tips: string;
  kind?: number[];
  petId?: number[];
  specificId?: number[];
  effectId: number;
  iconId: number;
  Id: number;
  intensify: number;
  isAdv: number;
  label: number;
  limitedType: number;
  target: number;
  to: number;
  type: number;
}

export interface IRoot {
  effect?: IEffectItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

function parseIEffectItem(reader: BytesReader): IEffectItem {
  const item: IEffectItem = {
    Id: reader.int(),
    analyze: reader.text(),
    args: reader.text(),
    come: reader.text(),
    effectId: 0,
    iconId: 0,
    intensify: 0,
    isAdv: 0,
    label: 0,
    limitedType: 0,
    target: 0,
    tips: "",
    to: 0,
    type: 0,
  };

  if (reader.boolean()) {
    const num = reader.int();
    item.des = Array.from({ length: num }, () => reader.text());
  }

  item.effectId = reader.int();
  item.iconId = reader.int();
  item.intensify = reader.int();
  item.isAdv = reader.int();

  if (reader.boolean()) {
    const num = reader.int();
    item.kind = Array.from({ length: num }, () => reader.int());
  }

  item.label = reader.int();
  item.limitedType = reader.int();

  if (reader.boolean()) {
    const num = reader.int();
    item.petId = Array.from({ length: num }, () => reader.int());
  }

  if (reader.boolean()) {
    const num = reader.int();
    item.specificId = Array.from({ length: num }, () => reader.int());
  }

  if (reader.boolean()) {
    const num = reader.int();
    item.tag = Array.from({ length: num }, () => reader.text());
  }

  item.target = reader.int();
  item.tips = reader.text();
  item.to = reader.int();
  item.type = reader.int();

  return item;
}

function parseIRoot(reader: BytesReader): IRoot {
  const root: IRoot = {};

  if (reader.boolean()) {
    const count = reader.int();
    root.effect = Array.from({ length: count }, () => parseIEffectItem(reader));
  }

  return root;
}

export async function parseEffectIconConfig(
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

  saveAsJson(root, "./json/effectIcon.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

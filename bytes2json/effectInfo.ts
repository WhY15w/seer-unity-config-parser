import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

interface IEffectItem {
  analyze: string;
  argsNum: number;
  id: number;
  info: string;
  key: string;
  param?: number[];
  type: number;
}

interface IParamTypeItem {
  id: number;
  params: string;
}

interface IEffectInfoRoot {
  Effect?: IEffectItem[];
  ParamType?: IParamTypeItem[];
}

export interface EffectInfoConfig {
  root?: IEffectInfoRoot;
}

function parseIEffectItem(reader: BytesReader): IEffectItem {
  const analyze = reader.text();
  const argsNum = reader.int();
  const id = reader.int();
  const info = reader.text();
  const key = reader.text();

  let param: number[] | undefined;
  if (reader.boolean()) {
    const count = reader.int();
    param = Array.from({ length: count }, () => reader.int());
  }

  const type = reader.int();

  return {
    analyze,
    argsNum,
    id,
    info,
    key,
    param,
    type,
  };
}

function parseIParamTypeItem(reader: BytesReader): IParamTypeItem {
  const id = reader.int();
  const params = reader.text();

  return { id, params };
}

function parseIRoot(reader: BytesReader): IEffectInfoRoot {
  const root: IEffectInfoRoot = {};

  // Effect[]
  if (reader.boolean()) {
    const count = reader.int();
    root.Effect = Array.from({ length: count }, () => parseIEffectItem(reader));
  }

  // ParamType[]
  if (reader.boolean()) {
    const count = reader.int();
    root.ParamType = Array.from({ length: count }, () =>
      parseIParamTypeItem(reader)
    );
  }

  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

export function parseEffectInfoConfig(filePath: string): EffectInfoConfig {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );

  const reader = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  if (!reader.boolean()) return {};

  const root = parseIRoot(reader);
  const result: EffectInfoConfig = { root };

  saveAsJson(result, "./json/effectInfo.json");
  return result;
}

import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

interface IBuffInfo {
  Desc: string;
  Tag: string;
  desc_tag: string;
  icon?: number[];
  icontype: number;
  id: number;
}

interface BuffConfig {
  data?: IBuffInfo[];
}

function parseIBuffInfo(reader: BytesReader): IBuffInfo {
  const res: IBuffInfo = {
    Desc: reader.text(),
    Tag: reader.text(),
    desc_tag: reader.text(),
    icontype: 0,
    id: 0,
  };

  if (reader.boolean()) {
    const n = reader.int();
    res.icon = Array.from({ length: n }, () => reader.int());
  }

  res.icontype = reader.int();
  res.id = reader.int();
  return res;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

export function parseBuffConfig(filePath: string): BuffConfig {
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
  const count = reader.int();
  console.log("buffCount:", count);
  const data = Array.from({ length: count }, () => parseIBuffInfo(reader));
  const result: BuffConfig = { data };

  saveAsJson(result, "./json/buff.json");
  return result;
}

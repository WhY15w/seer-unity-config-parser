import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

interface ISkillEffectInfo {
  formattingAdjustment: string;
  ifTextItalic: string;
  info: string;
  tagA: string;
  tagB: string;
  tagC: string;
  argsNum: number;
  Bosseffective: number;
  id: number;
  isif: number;
  tagAboss: number;
  tagBboss: number;
  tagCboss: number;
}

interface SkillEffectConfig {
  data?: ISkillEffectInfo[];
}

function parseISkillEffectInfo(reader: BytesReader): ISkillEffectInfo {
  const res: ISkillEffectInfo = {
    Bosseffective: reader.int(),
    argsNum: reader.int(),
    formattingAdjustment: reader.text(),
    id: reader.int(),
    ifTextItalic: reader.text(),
    info: reader.text(),
    isif: reader.int(),
    tagA: reader.text(),
    tagAboss: reader.int(),
    tagB: reader.text(),
    tagBboss: reader.int(),
    tagC: reader.text(),
    tagCboss: reader.int(),
  };

  return res;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

export function parseSkillEffectConfig(filePath: string): SkillEffectConfig {
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
  console.log("skillEffectCount:", count);

  const data = Array.from({ length: count }, () =>
    parseISkillEffectInfo(reader)
  );

  const result: SkillEffectConfig = { data };

  saveAsJson(result, "./json/skillEffect.json");
  return result;
}

import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface ISkinKindItem {
  ID: number;
  LifeTime: number;
  SkinType: number;
  Type: number;
  Year: number;
}

export interface ISkinItem {
  Go: string;
  GoType: string;
  Name: string;
  SkinKind?: ISkinKindItem[];
  ID: number;
  Jumptarget: number;
  MonID: number;
  Type: number;
}

export interface IPetSkins {
  Skin?: ISkinItem[];
}

export interface IRootInterface {
  PetSkins?: IPetSkins;
}

function parseISkinKindItem(reader: BytesReader): ISkinKindItem {
  return {
    ID: reader.int(),
    LifeTime: reader.int(),
    SkinType: reader.int(),
    Type: reader.int(),
    Year: reader.int(),
  };
}

function parseISkinItem(reader: BytesReader): ISkinItem {
  const res: ISkinItem = {
    Go: "",
    GoType: "",
    Name: "",
    SkinKind: undefined,
    ID: 0,
    Jumptarget: 0,
    MonID: 0,
    Type: 0,
  };

  res.Go = reader.text();
  res.GoType = reader.text();
  res.ID = reader.int();
  res.Jumptarget = reader.int();
  res.MonID = reader.int();
  res.Name = reader.text();

  if (reader.boolean()) {
    const num = reader.int();
    res.SkinKind = Array.from({ length: num }, () =>
      parseISkinKindItem(reader)
    );
  }

  res.Type = reader.int();
  return res;
}

function parseIPetSkins(reader: BytesReader): IPetSkins {
  const res: IPetSkins = {};

  if (reader.boolean()) {
    const num = reader.int();
    res.Skin = Array.from({ length: num }, () => parseISkinItem(reader));
  }
  return res;
}

function parseIRootInterface(reader: BytesReader): IRootInterface {
  const res: IRootInterface = {};

  if (reader.boolean()) {
    res.PetSkins = parseIPetSkins(reader);
  }
  return res;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`宠物皮肤配置已保存至：${outputPath}`);
}

export async function parsePetSkinConfig(
  filePath: string
): Promise<IRootInterface> {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const uint8Array = new Uint8Array(arrBuf);

  const reader = new BytesReader(uint8Array, {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const rootConfig = parseIRootInterface(reader);

  saveAsJson(rootConfig, "./json/pet_skin.json");

  return rootConfig;
}

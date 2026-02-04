import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IItemsItem {
  Name: string;
  type: string;
  actionDir: number;
  Bean: number;
  catID: number;
  Hide: number;
  ID: number;
  isSpecial: number;
  LifeTime: number;
  Max: number;
  Price: number;
  purpose: number;
  RepairPrice: number;
  Sort: number;
  speed: number;
  UseMax: number;
  VipOnly: number;
  wd: number;
}

export interface IRootInterface {
  items?: IItemsItem[];
}

function parseIItemsItem(reader: BytesReader): IItemsItem {
  const Bean = reader.int();
  const Hide = reader.int();
  const ID = reader.int();
  const LifeTime = reader.int();
  const Max = reader.int();
  const Name = reader.text();
  const Price = reader.int();
  const RepairPrice = reader.int();
  const Sort = reader.int();
  const UseMax = reader.int();
  const VipOnly = reader.int();
  const actionDir = reader.int();
  const catID = reader.int();
  const isSpecial = reader.int();
  const purpose = reader.int();
  const speed = reader.float();
  const type = reader.text();
  const wd = reader.int();

  return {
    Name,
    type,
    actionDir,
    Bean,
    catID,
    Hide,
    ID,
    isSpecial,
    LifeTime,
    Max,
    Price,
    purpose,
    RepairPrice,
    Sort,
    speed,
    UseMax,
    VipOnly,
    wd,
  };
}

export async function parseItemsOptimizeCatItems1Config(
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
    const count = reader.int();
    rootInterface.items = [];
    for (let i = 0; i < count; i++) {
      rootInterface.items.push(parseIItemsItem(reader));
    }
  }

  saveAsJson(rootInterface, "./json/itemsOptimizeCatItems1.json");
  return rootInterface;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

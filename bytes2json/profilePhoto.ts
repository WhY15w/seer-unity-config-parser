import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

export interface IProfilephotoInfo {
  desc: string;
  goto: string;
  name: string;
  spine: string;
  text: string;
  checkown: number;
  finishTime: number;
  hide: number;
  icon: number;
  id: number;
  rarity: number;
  tab: number;
  type: number;
  unavailable: number;
  unlocktype: number;
}

export interface IProfilephotoRoot {
  data?: IProfilephotoInfo[];
}

function parseIProfilephotoInfo(reader: BytesReader): IProfilephotoInfo {
  const checkown = reader.int();
  const desc = reader.text();
  const finishTime = reader.int();
  const goto = reader.text();
  const hide = reader.int();
  const icon = reader.int();
  const id = reader.int();
  const name = reader.text();
  const rarity = reader.int();
  const spine = reader.text();
  const tab = reader.int();
  const text = reader.text();
  const type = reader.int();
  const unavailable = reader.int();
  const unlocktype = reader.int();

  return {
    desc,
    goto,
    name,
    spine,
    text,
    checkown,
    finishTime,
    hide,
    icon,
    id,
    rarity,
    tab,
    type,
    unavailable,
    unlocktype,
  };
}

export async function parseProfilephotoConfig(
  filePath: string,
  maxParse?: number
): Promise<IProfilephotoRoot> {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const reader = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const root: IProfilephotoRoot = {};

  if (reader.boolean()) {
    const count = reader.int();
    root.data = [];
    for (let i = 0; i < count; i++) {
      root.data.push(parseIProfilephotoInfo(reader));
      if (maxParse && i + 1 >= maxParse) break;
    }
  }

  saveAsJson(root, "./json/profilephoto.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

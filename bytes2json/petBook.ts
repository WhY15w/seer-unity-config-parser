import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

// 定义所有接口，严格对应C#类的字段
export interface IItem {
  intro: string;
  place?: IPlaceItem[];
}

export interface IHotspot {
  item?: IItem;
}

export interface IBranchItem {
  intro: string;
  place?: IPlaceItem[];
  title: string;
  ID: number;
}

export interface ITypeItem {
  Branch?: IBranchItem[];
  ID: number;
}

export interface IPlaceItem {
  Desc: string;
  Go: string;
  Redirect: string;
  Mintmark?: number[];
  ID: number;
  ImageID: number;
  Label: number;
  monID: number;
  type: number;
}

export interface IRecMintmark {
  place?: IPlaceItem[];
}

export interface IPetDataItem {
  TagB?: number[];
  id: number;
  pid: number;
  TagA: number;
}

export interface IHotPet {
  PetData?: IPetDataItem[];
  type?: ITypeItem[];
}

export interface IMonsterItem {
  DefName: string;
  Features: string;
  Target: string;
  ID: number;
}

export interface IRoot {
  HotPet?: IHotPet;
  Hotspot?: IHotspot;
  Monster?: IMonsterItem[];
  RecMintmark?: IRecMintmark;
}

export interface IRootInterface {
  root?: IRoot;
}

// 通用字符串读取方法（C#中字符串为ushort长度 + UTF8字节）
function readUtf8String(reader: BytesReader): string {
  const len = reader.ushort();
  if (len > 0 && reader.offset + len <= reader.data.length) {
    return new TextDecoder().decode(reader.read(len));
  }
  return "";
}

// 解析IItem
function parseIItem(reader: BytesReader): IItem {
  const item: IItem = {
    intro: readUtf8String(reader),
  };

  // 解析place数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      item.place = Array.from({ length: num }, () => parseIPlaceItem(reader));
    }
  }

  return item;
}

// 解析IHotspot
function parseIHotspot(reader: BytesReader): IHotspot {
  const hotspot: IHotspot = {};

  // 解析item
  if (reader.boolean()) {
    hotspot.item = parseIItem(reader);
  }

  return hotspot;
}

// 解析IPlaceItem
function parseIPlaceItem(reader: BytesReader): IPlaceItem {
  const placeItem: IPlaceItem = {
    Desc: readUtf8String(reader),
    Go: readUtf8String(reader),
    ID: reader.int(),
    ImageID: reader.int(),
    Label: reader.int(),
    Redirect: "",
    monID: 0,
    type: 0,
  };

  // 解析Mintmark数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0 && reader.offset + num * 4 <= reader.data.length) {
      placeItem.Mintmark = Array.from({ length: num }, () => reader.int());
    }
  }

  // 解析Redirect
  placeItem.Redirect = readUtf8String(reader);

  // 解析monID和type
  placeItem.monID = reader.int();
  placeItem.type = reader.int();

  return placeItem;
}

// 解析IBranchItem
function parseIBranchItem(reader: BytesReader): IBranchItem {
  const branchItem: IBranchItem = {
    ID: reader.int(),
    intro: readUtf8String(reader),
    title: "",
  };

  // 解析place数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      branchItem.place = Array.from({ length: num }, () =>
        parseIPlaceItem(reader)
      );
    }
  }

  // 解析title
  branchItem.title = readUtf8String(reader);

  return branchItem;
}

// 解析ITypeItem
function parseITypeItem(reader: BytesReader): ITypeItem {
  const typeItem: ITypeItem = {
    ID: 0,
  };

  // 解析Branch数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      typeItem.Branch = Array.from({ length: num }, () =>
        parseIBranchItem(reader)
      );
    }
  }

  // 解析ID
  typeItem.ID = reader.int();

  return typeItem;
}

// 解析IRecMintmark
function parseIRecMintmark(reader: BytesReader): IRecMintmark {
  const recMintmark: IRecMintmark = {};

  // 解析place数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      recMintmark.place = Array.from({ length: num }, () =>
        parseIPlaceItem(reader)
      );
    }
  }

  return recMintmark;
}

// 解析IPetDataItem
function parseIPetDataItem(reader: BytesReader): IPetDataItem {
  const petDataItem: IPetDataItem = {
    TagA: reader.int(),
    id: 0,
    pid: 0,
  };

  // 解析TagB数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0 && reader.offset + num * 4 <= reader.data.length) {
      petDataItem.TagB = Array.from({ length: num }, () => reader.int());
    }
  }

  // 解析id和pid
  petDataItem.id = reader.int();
  petDataItem.pid = reader.int();

  return petDataItem;
}

// 解析IHotPet
function parseIHotPet(reader: BytesReader): IHotPet {
  const hotPet: IHotPet = {};

  // 解析PetData数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      hotPet.PetData = Array.from({ length: num }, () =>
        parseIPetDataItem(reader)
      );
    }
  }

  // 解析type数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      hotPet.type = Array.from({ length: num }, () => parseITypeItem(reader));
    }
  }

  return hotPet;
}

// 解析IMonsterItem
function parseIMonsterItem(reader: BytesReader): IMonsterItem {
  const monsterItem: IMonsterItem = {
    DefName: readUtf8String(reader),
    Features: readUtf8String(reader),
    ID: reader.int(),
    Target: "",
  };

  // 解析Target
  monsterItem.Target = readUtf8String(reader);

  return monsterItem;
}

// 解析IRoot
function parseIRoot(reader: BytesReader): IRoot {
  const root: IRoot = {};

  // 解析HotPet
  if (reader.boolean()) {
    root.HotPet = parseIHotPet(reader);
  }

  // 解析Hotspot
  if (reader.boolean()) {
    root.Hotspot = parseIHotspot(reader);
  }

  // 解析Monster数组
  if (reader.boolean()) {
    const num = reader.int();
    if (num > 0) {
      root.Monster = Array.from({ length: num }, () =>
        parseIMonsterItem(reader)
      );
    }
  }

  // 解析RecMintmark
  if (reader.boolean()) {
    root.RecMintmark = parseIRecMintmark(reader);
  }

  return root;
}

// 主解析函数
export async function parsePetbookConfig(
  filePath: string
): Promise<IRootInterface> {
  // 读取文件为Uint8Array
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

  // 解析root
  if (reader.boolean()) {
    rootInterface.root = parseIRoot(reader);
  }

  // 保存为JSON
  saveAsJson(rootInterface, "./json/petbook.json");

  return rootInterface;
}

// 保存JSON文件
function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

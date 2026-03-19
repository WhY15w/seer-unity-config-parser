import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  optionalObject,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

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

export interface IRecMintmark {
  place?: IPlaceItem[];
}

export interface IRootInterface {
  root?: IRoot;
}

const placeItemSchema: FieldSchema = [
  ["Desc", text()],
  ["Go", text()],
  ["ID", int()],
  ["ImageID", int()],
  ["Label", int()],
  ["Mintmark", optionalArray("int")],
  ["Redirect", text()],
  ["monID", int()],
  ["type", int()],
];

const itemSchema: FieldSchema = [
  ["intro", text()],
  ["place", optionalArrayStruct(placeItemSchema)],
];

const hotspotSchema: FieldSchema = [["item", optionalObject(itemSchema)]];

const branchItemSchema: FieldSchema = [
  ["ID", int()],
  ["intro", text()],
  ["place", optionalArrayStruct(placeItemSchema)],
  ["title", text()],
];

const typeItemSchema: FieldSchema = [
  ["Branch", optionalArrayStruct(branchItemSchema)],
  ["ID", int()],
];

const petDataItemSchema: FieldSchema = [
  ["TagA", int()],
  ["TagB", optionalArray("int")],
  ["id", int()],
  ["pid", int()],
];

const hotPetSchema: FieldSchema = [
  ["PetData", optionalArrayStruct(petDataItemSchema)],
  ["type", optionalArrayStruct(typeItemSchema)],
];

const monsterItemSchema: FieldSchema = [
  ["DefName", text()],
  ["Features", text()],
  ["ID", int()],
  ["Target", text()],
];

const recMintmarkSchema: FieldSchema = [
  ["place", optionalArrayStruct(placeItemSchema)],
];

const rootSchema: FieldSchema = [
  ["HotPet", optionalObject(hotPetSchema)],
  ["Hotspot", optionalObject(hotspotSchema)],
  ["Monster", optionalArrayStruct(monsterItemSchema)],
  ["RecMintmark", optionalObject(recMintmarkSchema)],
];

export const parsePetbookConfig = createConfigParser<IRootInterface>({
  name: "petBook",
  outputPath: "./json/petbook.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      result.root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return result;
  },
});

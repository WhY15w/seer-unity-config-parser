import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalObject,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

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

const skinKindItemSchema: FieldSchema = [
  ["ID", int()],
  ["LifeTime", int()],
  ["SkinType", int()],
  ["Type", int()],
  ["Year", int()],
];

const skinItemSchema: FieldSchema = [
  ["Go", text()],
  ["GoType", text()],
  ["ID", int()],
  ["Jumptarget", int()],
  ["MonID", int()],
  ["Name", text()],
  ["SkinKind", optionalArrayStruct(skinKindItemSchema)],
  ["Type", int()],
];

const petSkinsSchema: FieldSchema = [
  ["Skin", optionalArrayStruct(skinItemSchema)],
];

const rootSchema: FieldSchema = [["PetSkins", optionalObject(petSkinsSchema)]];

export const parsePetSkinConfig = createConfigParser<IRootInterface>({
  name: "petSkin",
  outputPath: "./json/pet_skin.json",
  parse: (reader) => parseBySchema<IRootInterface>(reader, rootSchema),
});

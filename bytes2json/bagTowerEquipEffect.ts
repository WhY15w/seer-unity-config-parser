import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerEquipEffectInfo {
  desc: string;
  effectclass: number;
  effectsubtype: number;
  effecttype: number;
  front: number;
  id: number;
  image: string;
  isfive: number;
  needsynthesis: number;
  object: number;
  param1: number;
  param2?: number[];
  quality: number;
  repeat: number;
  taketime: number;
}

export interface BagTowerEquipEffectConfig {
  data?: IBagTowerEquipEffectInfo[];
}

const bagTowerEquipEffectInfoSchema: FieldSchema = [
  ["desc", text()],
  ["effectclass", int()],
  ["effectsubtype", int()],
  ["effecttype", int()],
  ["front", int()],
  ["id", int()],
  ["image", text()],
  ["isfive", int()],
  ["needsynthesis", int()],
  ["object", int()],
  ["param1", int()],
  ["param2", optionalArray("int")],
  ["quality", int()],
  ["repeat", int()],
  ["taketime", int()],
];

export const parseBagTowerEquipEffectConfig = createSimpleListParser<IBagTowerEquipEffectInfo, BagTowerEquipEffectConfig>({
  name: "bagTower_EquipEffect",
  outputPath: "./json/bagTower_EquipEffect.json",
  dataKey: "data",
  itemSchema: bagTowerEquipEffectInfoSchema,
});

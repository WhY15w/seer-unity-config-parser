import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerEquipUpgradeInfo {
  atk: number;
  cost?: number[];
  defadd: number;
  flyspeed: number;
  goldadd: number;
  hpaddlimit: number;
  hprecover: number;
  icon: string;
  id: number;
  isshow: number;
  lv: number;
  name: string;
  opensynthesis: number;
  range: number;
  size: number;
  subtype: number;
  target: number;
  type: number;
  unlockeffect: number;
  usespeed: number;
}

export interface BagTowerEquipUpgradeConfig {
  data?: IBagTowerEquipUpgradeInfo[];
}

const bagTowerEquipUpgradeInfoSchema: FieldSchema = [
  ["atk", int()],
  ["cost", optionalArray("int")],
  ["defadd", int()],
  ["flyspeed", int()],
  ["goldadd", int()],
  ["hpaddlimit", int()],
  ["hprecover", int()],
  ["icon", text()],
  ["id", int()],
  ["isshow", int()],
  ["lv", int()],
  ["name", text()],
  ["opensynthesis", int()],
  ["range", int()],
  ["size", int()],
  ["subtype", int()],
  ["target", int()],
  ["type", int()],
  ["unlockeffect", int()],
  ["usespeed", int()],
];

export const parseBagTowerEquipUpgradeConfig = createSimpleListParser<IBagTowerEquipUpgradeInfo, BagTowerEquipUpgradeConfig>({
  name: "bagTower_EquipUpgrade",
  outputPath: "./json/bagTower_EquipUpgrade.json",
  dataKey: "data",
  itemSchema: bagTowerEquipUpgradeInfoSchema,
});

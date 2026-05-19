import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBagTowerEquipSynthesisInfo {
  atkgrowth: number;
  defaddgrowth: number;
  geteffect: number;
  goldaddgrowth: number;
  hpadlimitgrowth: number;
  hprecovergrowth: number;
  id: number;
  image: string;
  name: string;
  synthesislv: number;
  type: number;
}

export interface BagTowerEquipSynthesisConfig {
  data?: IBagTowerEquipSynthesisInfo[];
}

const bagTowerEquipSynthesisInfoSchema: FieldSchema = [
  ["atkgrowth", int()],
  ["defaddgrowth", int()],
  ["geteffect", int()],
  ["goldaddgrowth", int()],
  ["hpadlimitgrowth", int()],
  ["hprecovergrowth", int()],
  ["id", int()],
  ["image", text()],
  ["name", text()],
  ["synthesislv", int()],
  ["type", int()],
];

export const parseBagTowerEquipSynthesisConfig = createSimpleListParser<IBagTowerEquipSynthesisInfo, BagTowerEquipSynthesisConfig>({
  name: "bagTower_EquipSynthesis",
  outputPath: "./json/bagTower_EquipSynthesis.json",
  dataKey: "data",
  itemSchema: bagTowerEquipSynthesisInfoSchema,
});

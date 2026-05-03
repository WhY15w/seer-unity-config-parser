import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPveBossBraveTowerInfo {
  bossgetarg: number;
  bossgettext: string;
  bosslist?: number[];
  id: number;
  raidunlocktext: string;
  rewardid?: number[];
  rewardnum?: number[];
}

export interface PveBossBraveTowerConfig {
  data?: IPveBossBraveTowerInfo[];
}

const pveBossBraveTowerInfoSchema: FieldSchema = [
  ["bossgetarg", int()],
  ["bossgettext", text()],
  ["bosslist", optionalArray("int")],
  ["id", int()],
  ["raidunlocktext", text()],
  ["rewardid", optionalArray("int")],
  ["rewardnum", optionalArray("int")],
];

export const parsePveBossBraveTowerConfig = createSimpleListParser<
  IPveBossBraveTowerInfo,
  PveBossBraveTowerConfig
>({
  name: "PveBossBraveTower",
  outputPath: "./json/PveBossBraveTower.json",
  dataKey: "data",
  itemSchema: pveBossBraveTowerInfoSchema,
});

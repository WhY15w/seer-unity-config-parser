import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBraveTowerInfo {
  bigbossid: string;
  bossgetarg: number;
  bossgettext: string;
  bosslist: string;
  id: number;
  raidunlockarg: number;
  raidunlocktext: string;
  rewardid: string;
  rewardnum: string;
  rewardtype: string;
  sebossid: string;
}

export interface BraveTowerConfig {
  data?: IBraveTowerInfo[];
}

const braveTowerInfoSchema: FieldSchema = [
  ["bigbossid", text()],
  ["bossgetarg", int()],
  ["bossgettext", text()],
  ["bosslist", text()],
  ["id", int()],
  ["raidunlockarg", int()],
  ["raidunlocktext", text()],
  ["rewardid", text()],
  ["rewardnum", text()],
  ["rewardtype", text()],
  ["sebossid", text()],
];

export const parseBraveTowerConfig = createSimpleListParser<IBraveTowerInfo, BraveTowerConfig>({
  name: "brave_tower",
  outputPath: "./json/brave_tower.json",
  dataKey: "data",
  itemSchema: braveTowerInfoSchema,
});

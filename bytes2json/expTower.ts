import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IExpTowerInfo {
  bosslist: string;
  id: number;
  raidunlockarg: number;
  raidunlocktext: string;
  rewardid: string;
  rewardnum: string;
  rewardtype: string;
  sebossid: string;
}

export interface ExpTowerConfig {
  data?: IExpTowerInfo[];
}

const expTowerInfoSchema: FieldSchema = [
  ["bosslist", text()],
  ["id", int()],
  ["raidunlockarg", int()],
  ["raidunlocktext", text()],
  ["rewardid", text()],
  ["rewardnum", text()],
  ["rewardtype", text()],
  ["sebossid", text()],
];

export const parseExpTowerConfig = createSimpleListParser<IExpTowerInfo, ExpTowerConfig>({
  name: "exp_tower",
  outputPath: "./json/exp_tower.json",
  dataKey: "data",
  itemSchema: expTowerInfoSchema,
});

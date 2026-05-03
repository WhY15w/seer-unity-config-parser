import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpBossConfigInfo {
  baseData: string;
  extraData: string;
  id: number;
  mintmarkData: string;
  monsterEffect_id: number;
  monsterId: number;
  monsterLv: number;
  monsterMove: string;
  monsterName: string;
  monsterNewse: string;
}

export interface PvpBossConfigConfig {
  data?: IPvpBossConfigInfo[];
}

const pvpBossConfigInfoSchema: FieldSchema = [
  ["baseData", text()],
  ["extraData", text()],
  ["id", int()],
  ["mintmarkData", text()],
  ["monsterEffect_id", int()],
  ["monsterId", int()],
  ["monsterLv", int()],
  ["monsterMove", text()],
  ["monsterName", text()],
  ["monsterNewse", text()],
];

export const parsePvpBossConfigConfig = createSimpleListParser<IPvpBossConfigInfo, PvpBossConfigConfig>({
  name: "pvp_BossConfig",
  outputPath: "./json/pvp_BossConfig.json",
  dataKey: "data",
  itemSchema: pvpBossConfigInfoSchema,
});

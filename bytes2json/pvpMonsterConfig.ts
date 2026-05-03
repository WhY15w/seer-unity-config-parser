import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpMonsterConfigInfo {
  baseData: string;
  extraData: string;
  id: number;
  mintmark: string;
  mintmarkData: string;
  monsterCharacter: number;
  monsterEffect_id: number;
  monsterId: number;
  monsterLearning: string;
  monsterLv: number;
  monsterMove: string;
  monsterName: string;
  monsterNature: number;
  monsterNewse: string;
  monsterStrength: number;
  monsterTalent: number;
}

export interface PvpMonsterConfigConfig {
  data?: IPvpMonsterConfigInfo[];
}

const pvpMonsterConfigInfoSchema: FieldSchema = [
  ["baseData", text()],
  ["extraData", text()],
  ["id", int()],
  ["mintmark", text()],
  ["mintmarkData", text()],
  ["monsterCharacter", int()],
  ["monsterEffect_id", int()],
  ["monsterId", int()],
  ["monsterLearning", text()],
  ["monsterLv", int()],
  ["monsterMove", text()],
  ["monsterName", text()],
  ["monsterNature", int()],
  ["monsterNewse", text()],
  ["monsterStrength", int()],
  ["monsterTalent", int()],
];

export const parsePvpMonsterConfigConfig = createSimpleListParser<IPvpMonsterConfigInfo, PvpMonsterConfigConfig>({
  name: "pvp_MonsterConfig",
  outputPath: "./json/pvp_MonsterConfig.json",
  dataKey: "data",
  itemSchema: pvpMonsterConfigInfoSchema,
});

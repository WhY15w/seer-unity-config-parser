import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMonsterVideosInfo {
  id: number;
  name: string;
}

export interface MonsterVideosConfig {
  data?: IMonsterVideosInfo[];
}

const monsterVideosInfoSchema: FieldSchema = [
  ["id", int()],
  ["name", text()],
];

export const parseMonsterVideosConfig = createSimpleListParser<IMonsterVideosInfo, MonsterVideosConfig>({
  name: "monsterVideos",
  outputPath: "./json/monsterVideos.json",
  dataKey: "data",
  itemSchema: monsterVideosInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMiniGameInfo {
  child?: number[];
  health: number;
  id: number;
  path: string;
  realId: number;
  type: number;
}

export interface MiniGameConfig {
  data?: IMiniGameInfo[];
}

const miniGameInfoSchema: FieldSchema = [
  ["child", optionalArray("int")],
  ["health", int()],
  ["id", int()],
  ["path", text()],
  ["realId", int()],
  ["type", int()],
];

export const parseMiniGameConfig = createSimpleListParser<IMiniGameInfo, MiniGameConfig>({
  name: "mini_game",
  outputPath: "./json/mini_game.json",
  dataKey: "data",
  itemSchema: miniGameInfoSchema,
});

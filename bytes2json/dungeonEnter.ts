import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IDungeonEnterInfo {
  id: number;
  isOpen: number;
  isShow: number;
  moduleID: number;
  name: string;
  openParam: string;
  order: number;
  redbadge: number;
  res: string;
  reward?: number[];
  showType: number;
  timeLimit: string;
  times?: number[];
  type: number;
}

export interface DungeonEnterConfig {
  data?: IDungeonEnterInfo[];
}

const dungeonEnterInfoSchema: FieldSchema = [
  ["id", int()],
  ["isOpen", int()],
  ["isShow", int()],
  ["moduleID", int()],
  ["name", text()],
  ["openParam", text()],
  ["order", int()],
  ["redbadge", int()],
  ["res", text()],
  ["reward", optionalArray("int")],
  ["showType", int()],
  ["timeLimit", text()],
  ["times", optionalArray("int")],
  ["type", int()],
];

export const parseDungeonEnterConfig = createSimpleListParser<IDungeonEnterInfo, DungeonEnterConfig>({
  name: "dungeon_enter",
  outputPath: "./json/dungeon_enter.json",
  dataKey: "data",
  itemSchema: dungeonEnterInfoSchema,
});

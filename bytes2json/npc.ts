import {
  createSimpleListParser,
  text,
  int,
  float,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INpcInfo {
  CharacterID: number;
  emoji: string;
  id: number;
  initialposition: string;
  name: string;
  portrait: string;
  scale: number;
  silhouette: number;
}

export interface NpcConfig {
  data?: INpcInfo[];
}

const npcInfoSchema: FieldSchema = [
  ["CharacterID", int()],
  ["emoji", text()],
  ["id", int()],
  ["initialposition", text()],
  ["name", text()],
  ["portrait", text()],
  ["scale", float()],
  ["silhouette", int()],
];

export const parseNpcConfig = createSimpleListParser<INpcInfo, NpcConfig>({
  name: "npc",
  outputPath: "./json/npc.json",
  dataKey: "data",
  itemSchema: npcInfoSchema,
});

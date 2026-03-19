import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpBanExpertInfo {
  id: number;
  name: string;
  quantity: number;
  reward: string;
  seasonopen: number;
  subkey_month: number;
  subkey_total: number;
  type: number;
}

export interface IRootInterface {
  data?: IPvpBanExpertInfo[];
}

const pvpBanExpertInfoSchema: FieldSchema = [
  ["id", int()],
  ["name", text()],
  ["quantity", int()],
  ["reward", text()],
  ["seasonopen", int()],
  ["subkey_month", int()],
  ["subkey_total", int()],
  ["type", int()],
];

export const parsePvpBanExpertConfig = createSimpleListParser<
  IPvpBanExpertInfo,
  IRootInterface
>({
  name: "pvp_ban_expert",
  outputPath: "./json/pvp_ban_expert.json",
  dataKey: "data",
  itemSchema: pvpBanExpertInfoSchema,
});

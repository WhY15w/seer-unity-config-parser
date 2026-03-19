import {
  createSimpleListParser,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpBanInfo {
  id: number;
  name?: number[];
  quantity: number;
  subkey: number;
  type: number;
}

export interface IRootInterface {
  data?: IPvpBanInfo[];
}

const pvpBanInfoSchema: FieldSchema = [
  ["id", int()],
  ["name", optionalArray("int")],
  ["quantity", int()],
  ["subkey", int()],
  ["type", int()],
];

export const parsePvpBanConfig = createSimpleListParser<
  IPvpBanInfo,
  IRootInterface
>({
  name: "pvp_ban",
  outputPath: "./json/pvp_ban.json",
  dataKey: "data",
  itemSchema: pvpBanInfoSchema,
});

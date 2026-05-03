import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpRaceInfo {
  id: number;
}

export interface PvpRaceConfig {
  data?: IPvpRaceInfo[];
}

const pvpRaceInfoSchema: FieldSchema = [
  ["id", int()],
];

export const parsePvpRaceConfig = createSimpleListParser<IPvpRaceInfo, PvpRaceConfig>({
  name: "pvp_race",
  outputPath: "./json/pvp_race.json",
  dataKey: "data",
  itemSchema: pvpRaceInfoSchema,
});

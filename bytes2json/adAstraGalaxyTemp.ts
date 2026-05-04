import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraGalaxyTempInfo {
  endTime: number;
  galaxyId: number;
  galaxyName: string;
  galaxyNameEn: string;
  galaxyType: number;
  id: number;
  starId: number;
  starLevel: string;
  starName: string;
  starProgressAll: number;
  unlockStar: string;
  unlockTime: number;
}

export interface AdAstraGalaxyTempConfig {
  data?: IAdAstraGalaxyTempInfo[];
}

const adAstraGalaxyTempInfoSchema: FieldSchema = [
  ["endTime", int()],
  ["galaxyId", int()],
  ["galaxyName", text()],
  ["galaxyNameEn", text()],
  ["galaxyType", int()],
  ["id", int()],
  ["starId", int()],
  ["starLevel", text()],
  ["starName", text()],
  ["starProgressAll", int()],
  ["unlockStar", text()],
  ["unlockTime", int()],
];

export const parseAdAstraGalaxyTempConfig = createSimpleListParser<IAdAstraGalaxyTempInfo, AdAstraGalaxyTempConfig>({
  name: "AdAstraGalaxy_temp",
  outputPath: "./json/AdAstraGalaxy_temp.json",
  dataKey: "data",
  itemSchema: adAstraGalaxyTempInfoSchema,
});

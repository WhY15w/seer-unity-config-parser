import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraGalaxyInfo {
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

export interface AdAstraGalaxyConfig {
  data?: IAdAstraGalaxyInfo[];
}

const adAstraGalaxyInfoSchema: FieldSchema = [
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

export const parseAdAstraGalaxyConfig = createSimpleListParser<IAdAstraGalaxyInfo, AdAstraGalaxyConfig>({
  name: "AdAstraGalaxy",
  outputPath: "./json/AdAstraGalaxy.json",
  dataKey: "data",
  itemSchema: adAstraGalaxyInfoSchema,
});

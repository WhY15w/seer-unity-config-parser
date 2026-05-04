import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAdAstraGalaxyGuoqingInfo {
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

export interface AdAstraGalaxyGuoqingConfig {
  data?: IAdAstraGalaxyGuoqingInfo[];
}

const adAstraGalaxyGuoqingInfoSchema: FieldSchema = [
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

export const parseAdAstraGalaxyGuoqingConfig = createSimpleListParser<IAdAstraGalaxyGuoqingInfo, AdAstraGalaxyGuoqingConfig>({
  name: "AdAstraGalaxy_guoqing",
  outputPath: "./json/AdAstraGalaxy_guoqing.json",
  dataKey: "data",
  itemSchema: adAstraGalaxyGuoqingInfoSchema,
});

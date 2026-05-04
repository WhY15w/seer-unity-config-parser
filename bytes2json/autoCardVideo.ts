import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutoCardVideoInfo {
  Video: string;
  id: number;
  playerId: number;
  videoDes: string;
  videoType: string;
}

export interface AutoCardVideoConfig {
  data?: IAutoCardVideoInfo[];
}

const autoCardVideoInfoSchema: FieldSchema = [
  ["Video", text()],
  ["id", int()],
  ["playerId", int()],
  ["videoDes", text()],
  ["videoType", text()],
];

export const parseAutoCardVideoConfig = createSimpleListParser<IAutoCardVideoInfo, AutoCardVideoConfig>({
  name: "autoCardVideo",
  outputPath: "./json/autoCardVideo.json",
  dataKey: "data",
  itemSchema: autoCardVideoInfoSchema,
});

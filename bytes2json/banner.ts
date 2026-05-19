import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBannerInfo {
  finishtime: string;
  id: number;
  image: string;
  isshow: number;
  sort: number;
  starttime: string;
  target: number;
}

export interface BannerConfig {
  data?: IBannerInfo[];
}

const bannerInfoSchema: FieldSchema = [
  ["finishtime", text()],
  ["id", int()],
  ["image", text()],
  ["isshow", int()],
  ["sort", int()],
  ["starttime", text()],
  ["target", int()],
];

export const parseBannerConfig = createSimpleListParser<IBannerInfo, BannerConfig>({
  name: "banner",
  outputPath: "./json/banner.json",
  dataKey: "data",
  itemSchema: bannerInfoSchema,
});

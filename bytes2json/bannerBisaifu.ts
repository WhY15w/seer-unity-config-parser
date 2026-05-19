import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBannerBisaifuInfo {
  finishtime: string;
  id: number;
  image: string;
  isshow: number;
  sort: number;
  starttime: string;
  target: number;
}

export interface BannerBisaifuConfig {
  data?: IBannerBisaifuInfo[];
}

const bannerBisaifuInfoSchema: FieldSchema = [
  ["finishtime", text()],
  ["id", int()],
  ["image", text()],
  ["isshow", int()],
  ["sort", int()],
  ["starttime", text()],
  ["target", int()],
];

export const parseBannerBisaifuConfig = createSimpleListParser<IBannerBisaifuInfo, BannerBisaifuConfig>({
  name: "banner_bisaifu",
  outputPath: "./json/banner_bisaifu.json",
  dataKey: "data",
  itemSchema: bannerBisaifuInfoSchema,
});

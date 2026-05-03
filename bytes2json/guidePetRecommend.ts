import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IGuidePetRecommendInfo {
  fifthProgress?: string[];
  gainday: string;
  id: number;
  judge5thmoveByvalue?: string[];
  judgeNewseByvalue?: string[];
  judgeOnekeyget: string;
  judgePetByvalue?: string[];
  petID: number;
  petProgress?: string[];
  recommend: number;
  seProgress?: string[];
  stage: number;
  strategy?: number[];
}

export interface GuidePetRecommendConfig {
  data?: IGuidePetRecommendInfo[];
}

const guidePetRecommendInfoSchema: FieldSchema = [
  ["fifthProgress", optionalArray("text")],
  ["gainday", text()],
  ["id", int()],
  ["judge5thmoveByvalue", optionalArray("text")],
  ["judgeNewseByvalue", optionalArray("text")],
  ["judgeOnekeyget", text()],
  ["judgePetByvalue", optionalArray("text")],
  ["petID", int()],
  ["petProgress", optionalArray("text")],
  ["recommend", int()],
  ["seProgress", optionalArray("text")],
  ["stage", int()],
  ["strategy", optionalArray("int")],
];

export const parseGuidePetRecommendConfig = createSimpleListParser<IGuidePetRecommendInfo, GuidePetRecommendConfig>({
  name: "guidePetRecommend",
  outputPath: "./json/guidePetRecommend.json",
  dataKey: "data",
  itemSchema: guidePetRecommendInfoSchema,
});

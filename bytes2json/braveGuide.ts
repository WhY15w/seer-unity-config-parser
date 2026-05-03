import {
  createSimpleListParser,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBraveGuideInfo {
  guideparam?: string[];
  guidetype: number;
  id: number;
}

export interface BraveGuideConfig {
  data?: IBraveGuideInfo[];
}

const braveGuideInfoSchema: FieldSchema = [
  ["guideparam", optionalArray("text")],
  ["guidetype", int()],
  ["id", int()],
];

export const parseBraveGuideConfig = createSimpleListParser<IBraveGuideInfo, BraveGuideConfig>({
  name: "brave_guide",
  outputPath: "./json/brave_guide.json",
  dataKey: "data",
  itemSchema: braveGuideInfoSchema,
});

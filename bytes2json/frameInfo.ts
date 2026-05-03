import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IFrameInfoInfo {
  DefautlFrameID: number;
  FrameType: number;
  id: number;
  userinfo: number;
}

export interface FrameInfoConfig {
  data?: IFrameInfoInfo[];
}

const frameInfoInfoSchema: FieldSchema = [
  ["DefautlFrameID", int()],
  ["FrameType", int()],
  ["id", int()],
  ["userinfo", int()],
];

export const parseFrameInfoConfig = createSimpleListParser<IFrameInfoInfo, FrameInfoConfig>({
  name: "FrameInfo",
  outputPath: "./json/FrameInfo.json",
  dataKey: "data",
  itemSchema: frameInfoInfoSchema,
});

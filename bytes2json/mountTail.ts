import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMountTailInfo {
  coord: string;
  id: number;
  name: string;
}

export interface MountTailConfig {
  data?: IMountTailInfo[];
}

const mountTailInfoSchema: FieldSchema = [
  ["coord", text()],
  ["id", int()],
  ["name", text()],
];

export const parseMountTailConfig = createSimpleListParser<IMountTailInfo, MountTailConfig>({
  name: "mount_tail",
  outputPath: "./json/mount_tail.json",
  dataKey: "data",
  itemSchema: mountTailInfoSchema,
});

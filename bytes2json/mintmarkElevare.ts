import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMintmarkElevareInfo {
  desc: string;
  cost?: number[];
  elevareMintmark: number;
  id: number;
  originMintmark: number;
  primumMintmark: number;
  statinfo: number;
  type: number;
}

export interface IMintmarkElevare {
  fileName: string;
  data?: IMintmarkElevareInfo[];
}

const mintmarkElevareInfoSchema: FieldSchema = [
  ["cost", optionalArray("int")],
  ["desc", text()],
  ["elevareMintmark", int()],
  ["id", int()],
  ["originMintmark", int()],
  ["primumMintmark", int()],
  ["statinfo", int()],
  ["type", int()],
];

export const parseMintmarkElevareConfig = createConfigParser<IMintmarkElevare>({
  name: "mintmarkElevare",
  outputPath: "./json/mintmarkElevare.json",
  parse: (reader) => {
    const res: IMintmarkElevare = { fileName: "mintmarkElevare" };
    if (reader.boolean()) {
      const count = reader.int();
      if (count > 0) {
        res.data = Array.from({ length: count }, () =>
          parseBySchema<IMintmarkElevareInfo>(reader, mintmarkElevareInfoSchema)
        );
      }
    }
    return res;
  },
});

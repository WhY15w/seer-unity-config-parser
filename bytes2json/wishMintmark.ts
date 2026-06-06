import {
  createConfigParser,
  parseBySchema,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWishMintMarkItem {
  MintmarkName: string;
  MintmarkID: number;
  WishMintmarkID: number;
  WishrankID: number;
}

export interface IWishMintMarks {
  WishMintMark?: IWishMintMarkItem[];
}

export interface IRootInterface {
  WishMintMarks?: IWishMintMarks;
}

const wishMintMarkItemSchema: FieldSchema = [
  ["MintmarkID", int()],
  ["MintmarkName", text()],
  ["WishMintmarkID", int()],
  ["WishrankID", int()],
];

export const parseWishMintmarkConfig = createConfigParser<IRootInterface>({
  name: "WishMintmark",
  outputPath: "./json/WishMintmark.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const wishMintMarks: IWishMintMarks = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log("WishMintmarkCount:", count);
        wishMintMarks.WishMintMark = Array.from({ length: count }, () =>
          parseBySchema<IWishMintMarkItem>(reader, wishMintMarkItemSchema),
        );
      }
      result.WishMintMarks = wishMintMarks;
    }
    return result;
  },
});

import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWishsuitItem {
  SuitID: number;
  SuitName: string;
  SuitPart1: number;
  SuitPart2: number;
  SuitPart3: number;
  SuitPart4: number;
  SuitPart5: number;
  WishrankID: number;
  WishsuitID: number;
}

export interface IWishsuits {
  Wishsuit?: IWishsuitItem[];
}

export interface IRootInterface {
  Wishsuits?: IWishsuits;
}

const wishsuitItemSchema: FieldSchema = [
  ["SuitID", int()],
  ["SuitName", text()],
  ["SuitPart1", int()],
  ["SuitPart2", int()],
  ["SuitPart3", int()],
  ["SuitPart4", int()],
  ["SuitPart5", int()],
  ["WishrankID", int()],
  ["WishsuitID", int()],
];

export const parseWishsuitConfig = createConfigParser<IRootInterface>({
  name: "Wishsuit",
  outputPath: "./json/Wishsuit.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const wishsuits: IWishsuits = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log("WishsuitCount:", count);
        wishsuits.Wishsuit = Array.from({ length: count }, () =>
          parseBySchema<IWishsuitItem>(reader, wishsuitItemSchema),
        );
      }
      result.Wishsuits = wishsuits;
    }
    return result;
  },
});

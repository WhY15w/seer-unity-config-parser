import {
  createConfigParser,
  parseBySchema,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWishskinItem {
  MonID: number;
  PetSkinID: number;
  WishskinID: number;
}

export interface IWishskins {
  Wishskin?: IWishskinItem[];
}

export interface IRootInterface {
  Wishskins?: IWishskins;
}

const wishskinItemSchema: FieldSchema = [
  ["MonID", int()],
  ["PetSkinID", int()],
  ["WishskinID", int()],
];

export const parseWishskinConfig = createConfigParser<IRootInterface>({
  name: "Wishskin",
  outputPath: "./json/Wishskin.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const wishskins: IWishskins = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log("WishskinCount:", count);
        wishskins.Wishskin = Array.from({ length: count }, () =>
          parseBySchema<IWishskinItem>(reader, wishskinItemSchema),
        );
      }
      result.Wishskins = wishskins;
    }
    return result;
  },
});

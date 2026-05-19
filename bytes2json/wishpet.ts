import {
  createConfigParser,
  parseBySchema,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWishpetItem {
  MonsterID: number;
  MonsterStar: number;
  WishProgress: number;
  WishpetID: number;
}

export interface IWishpets {
  Wishpet?: IWishpetItem[];
}

export interface IRootInterface {
  Wishpets?: IWishpets;
}

const wishpetItemSchema: FieldSchema = [
  ["MonsterID", int()],
  ["MonsterStar", int()],
  ["WishProgress", int()],
  ["WishpetID", int()],
];

export const parseWishpetConfig = createConfigParser<IRootInterface>({
  name: "Wishpet",
  outputPath: "./json/Wishpet.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const wishpets: IWishpets = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log("WishpetCount:", count);
        wishpets.Wishpet = Array.from({ length: count }, () =>
          parseBySchema<IWishpetItem>(reader, wishpetItemSchema),
        );
      }
      result.Wishpets = wishpets;
    }
    return result;
  },
});

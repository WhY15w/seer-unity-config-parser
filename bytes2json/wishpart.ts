import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IWishpartItem {
  PartItemID: number;
  PartItemName: string;
  PartItemType: string;
  WishpartID: number;
  WishrankID: number;
}

export interface IWishparts {
  Wishpart?: IWishpartItem[];
}

export interface IRootInterface {
  Wishparts?: IWishparts;
}

const wishpartItemSchema: FieldSchema = [
  ["PartItemID", int()],
  ["PartItemName", text()],
  ["PartItemType", text()],
  ["WishpartID", int()],
  ["WishrankID", int()],
];

export const parseWishpartConfig = createConfigParser<IRootInterface>({
  name: "Wishpart",
  outputPath: "./json/Wishpart.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const wishparts: IWishparts = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log("WishpartCount:", count);
        wishparts.Wishpart = Array.from({ length: count }, () =>
          parseBySchema<IWishpartItem>(reader, wishpartItemSchema),
        );
      }
      result.Wishparts = wishparts;
    }
    return result;
  },
});

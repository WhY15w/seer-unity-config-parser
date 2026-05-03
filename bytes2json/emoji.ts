import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IEmojiInfo {
  icon: string;
  id: number;
}

export interface EmojiConfig {
  data?: IEmojiInfo[];
}

const emojiInfoSchema: FieldSchema = [
  ["icon", text()],
  ["id", int()],
];

export const parseEmojiConfig = createSimpleListParser<IEmojiInfo, EmojiConfig>({
  name: "emoji",
  outputPath: "./json/emoji.json",
  dataKey: "data",
  itemSchema: emojiInfoSchema,
});

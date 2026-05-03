import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILoginGiftInfo {
  drop_list: string;
  id: number;
}

export interface LoginGiftConfig {
  data?: ILoginGiftInfo[];
}

const loginGiftInfoSchema: FieldSchema = [
  ["drop_list", text()],
  ["id", int()],
];

export const parseLoginGiftConfig = createSimpleListParser<ILoginGiftInfo, LoginGiftConfig>({
  name: "LoginGift",
  outputPath: "./json/LoginGift.json",
  dataKey: "data",
  itemSchema: loginGiftInfoSchema,
});

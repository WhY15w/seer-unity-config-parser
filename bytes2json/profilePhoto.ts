import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IProfilephotoInfo {
  desc: string;
  goto: string;
  name: string;
  spine: string;
  text: string;
  checkown: number;
  finishTime: number;
  hide: number;
  icon: number;
  id: number;
  rarity: number;
  tab: number;
  type: number;
  unavailable: number;
  unlocktype: number;
}

export interface IProfilephotoRoot {
  data?: IProfilephotoInfo[];
}

const profilephotoInfoSchema: FieldSchema = [
  ["checkown", int()],
  ["desc", text()],
  ["finishTime", int()],
  ["goto", text()],
  ["hide", int()],
  ["icon", int()],
  ["id", int()],
  ["name", text()],
  ["rarity", int()],
  ["spine", text()],
  ["tab", int()],
  ["text", text()],
  ["type", int()],
  ["unavailable", int()],
  ["unlocktype", int()],
];

export const parseProfilephotoConfig = createSimpleListParser<
  IProfilephotoInfo,
  IProfilephotoRoot
>({
  name: "profilephoto",
  outputPath: "./json/profilephoto.json",
  dataKey: "data",
  itemSchema: profilephotoInfoSchema,
});

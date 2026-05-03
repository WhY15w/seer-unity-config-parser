import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IExpressJumpInfo {
  clickLock: number;
  closeother: number;
  dest: string;
  id: number;
  image: string;
  iosLock: number;
  name: string;
  priority: number;
  reddotid: number;
  statlog: string;
}

export interface ExpressJumpConfig {
  data?: IExpressJumpInfo[];
}

const expressJumpInfoSchema: FieldSchema = [
  ["clickLock", int()],
  ["closeother", int()],
  ["dest", text()],
  ["id", int()],
  ["image", text()],
  ["iosLock", int()],
  ["name", text()],
  ["priority", int()],
  ["reddotid", int()],
  ["statlog", text()],
];

export const parseExpressJumpConfig = createSimpleListParser<IExpressJumpInfo, ExpressJumpConfig>({
  name: "express_jump",
  outputPath: "./json/express_jump.json",
  dataKey: "data",
  itemSchema: expressJumpInfoSchema,
});

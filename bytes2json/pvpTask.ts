import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpTaskInfo {
  describe: string;
  rewardinfo: string;
  title: string;
  exp: number;
  id: number;
  pos: number;
  rarity: number;
  subkey: number;
  time: number;
  userinfo: number;
  value: number;
}

export interface IRootInterface {
  data?: IPvpTaskInfo[];
}

const pvpTaskInfoSchema: FieldSchema = [
  ["describe", text()],
  ["exp", int()],
  ["id", int()],
  ["pos", int()],
  ["rarity", int()],
  ["rewardinfo", text()],
  ["subkey", int()],
  ["time", int()],
  ["title", text()],
  ["userinfo", int()],
  ["value", int()],
];

export const parsePvpTaskConfig = createSimpleListParser<
  IPvpTaskInfo,
  IRootInterface
>({
  name: "pvp_task",
  outputPath: "./json/pvp_task.json",
  dataKey: "data",
  itemSchema: pvpTaskInfoSchema,
});

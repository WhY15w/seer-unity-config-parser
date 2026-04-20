import {
  createSimpleListParser,
  int,
  text,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPvpAchieveInfo {
  describe: string;
  foreverType: number;
  id: number;
  rewardinfo: string;
  title: string;
  value: number;
}

export interface IRootInterface {
  data?: IPvpAchieveInfo[];
}

const pvpAchieveInfoSchema: FieldSchema = [
  ["describe", text()],
  ["foreverType", int()],
  ["id", int()],
  ["rewardinfo", text()],
  ["title", text()],
  ["value", int()],
];

export const parsePvpAchieveConfig = createSimpleListParser<
  IPvpAchieveInfo,
  IRootInterface
>({
  name: "pvp_achieve",
  outputPath: "./json/pvp_achieve.json",
  dataKey: "data",
  itemSchema: pvpAchieveInfoSchema,
});

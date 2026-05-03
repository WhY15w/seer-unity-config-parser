import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewBraveChallengeInfo {
  id: number;
  jump: number;
  rewardinfo?: number[];
  title: string;
}

export interface NewBraveChallengeConfig {
  data?: INewBraveChallengeInfo[];
}

const newBraveChallengeInfoSchema: FieldSchema = [
  ["id", int()],
  ["jump", int()],
  ["rewardinfo", optionalArray("int")],
  ["title", text()],
];

export const parseNewBraveChallengeConfig = createSimpleListParser<INewBraveChallengeInfo, NewBraveChallengeConfig>({
  name: "newBraveChallenge",
  outputPath: "./json/newBraveChallenge.json",
  dataKey: "data",
  itemSchema: newBraveChallengeInfoSchema,
});

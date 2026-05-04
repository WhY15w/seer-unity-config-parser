import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IBadgeBattlePassTaskInfo {
  describe: string;
  exp: number;
  go: number;
  id: number;
  time: number;
  timeend: string;
  timelimit: string;
  timestart: string;
  userinfo: number;
  value: number;
}

export interface BadgeBattlePassTaskConfig {
  data?: IBadgeBattlePassTaskInfo[];
}

const badgeBattlePassTaskInfoSchema: FieldSchema = [
  ["describe", text()],
  ["exp", int()],
  ["go", int()],
  ["id", int()],
  ["time", int()],
  ["timeend", text()],
  ["timelimit", text()],
  ["timestart", text()],
  ["userinfo", int()],
  ["value", int()],
];

export const parseBadgeBattlePassTaskConfig = createSimpleListParser<IBadgeBattlePassTaskInfo, BadgeBattlePassTaskConfig>({
  name: "badgeBattlePass_task",
  outputPath: "./json/badgeBattlePass_task.json",
  dataKey: "data",
  itemSchema: badgeBattlePassTaskInfoSchema,
});

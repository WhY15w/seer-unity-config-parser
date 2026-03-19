import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

interface ISkillEffectInfo {
  formattingAdjustment: string;
  ifTextItalic: string;
  info: string;
  tagA: string;
  tagB: string;
  tagC: string;
  argsNum: number;
  Bosseffective: number;
  id: number;
  isif: number;
  tagAboss: number;
  tagBboss: number;
  tagCboss: number;
}

interface SkillEffectConfig {
  data?: ISkillEffectInfo[];
}

const skillEffectInfoSchema: FieldSchema = [
  ["Bosseffective", int()],
  ["argsNum", int()],
  ["formattingAdjustment", text()],
  ["id", int()],
  ["ifTextItalic", text()],
  ["info", text()],
  ["isif", int()],
  ["tagA", text()],
  ["tagAboss", int()],
  ["tagB", text()],
  ["tagBboss", int()],
  ["tagC", text()],
  ["tagCboss", int()],
];

export const parseSkillEffectConfig = createSimpleListParser<
  ISkillEffectInfo,
  SkillEffectConfig
>({
  name: "skillEffect",
  outputPath: "./json/skillEffect.json",
  dataKey: "data",
  itemSchema: skillEffectInfoSchema,
});

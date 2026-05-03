import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMonthpetInfo {
  id: number;
  month: number;
  reward: number;
  showpet: number;
  showskill: number;
  title: string;
}

export interface MonthpetConfig {
  data?: IMonthpetInfo[];
}

const monthpetInfoSchema: FieldSchema = [
  ["id", int()],
  ["month", int()],
  ["reward", int()],
  ["showpet", int()],
  ["showskill", int()],
  ["title", text()],
];

export const parseMonthpetConfig = createSimpleListParser<IMonthpetInfo, MonthpetConfig>({
  name: "monthpet",
  outputPath: "./json/monthpet.json",
  dataKey: "data",
  itemSchema: monthpetInfoSchema,
});

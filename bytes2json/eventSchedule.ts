import {
  createSimpleListParser,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IEventScheduleInfo {
  eventTime: number;
  eventVenue: number;
  id: number;
  oddsLeft: number;
  oddsRight: number;
  playerLeft: number;
  playerRight: number;
  userinfo1: number;
  userinfo2: number;
}

export interface EventScheduleConfig {
  data?: IEventScheduleInfo[];
}

const eventScheduleInfoSchema: FieldSchema = [
  ["eventTime", int()],
  ["eventVenue", int()],
  ["id", int()],
  ["oddsLeft", int()],
  ["oddsRight", int()],
  ["playerLeft", int()],
  ["playerRight", int()],
  ["userinfo1", int()],
  ["userinfo2", int()],
];

export const parseEventScheduleConfig = createSimpleListParser<IEventScheduleInfo, EventScheduleConfig>({
  name: "eventSchedule",
  outputPath: "./json/eventSchedule.json",
  dataKey: "data",
  itemSchema: eventScheduleInfoSchema,
});

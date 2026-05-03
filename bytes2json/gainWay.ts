import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IGainWayInfo {
  FrontGoto_1: string;
  FrontGoto_2: string;
  FrontGoto_3: string;
  FrontGoto_4: string;
  FrontGoto_5: string;
  Goto_1: string;
  Goto_2: string;
  Goto_3: string;
  Goto_4: string;
  Goto_5: string;
  ItemID: number;
  ItemName: string;
  Show_1: string;
  Show_2: string;
  Show_3: string;
  Show_4: string;
  Show_5: string;
  Tab_1: string;
  Tab_2: string;
  Tab_3: string;
  Tab_4: string;
  Tab_5: string;
  Text_1: string;
  Text_2: string;
  Text_3: string;
  Text_4: string;
  Text_5: string;
  Title: number;
  Type_1: string;
  Type_2: string;
  Type_3: string;
  Type_4: string;
  Type_5: string;
  id: number;
}

export interface GainWayConfig {
  data?: IGainWayInfo[];
}

const gainWayInfoSchema: FieldSchema = [
  ["FrontGoto_1", text()],
  ["FrontGoto_2", text()],
  ["FrontGoto_3", text()],
  ["FrontGoto_4", text()],
  ["FrontGoto_5", text()],
  ["Goto_1", text()],
  ["Goto_2", text()],
  ["Goto_3", text()],
  ["Goto_4", text()],
  ["Goto_5", text()],
  ["ItemID", int()],
  ["ItemName", text()],
  ["Show_1", text()],
  ["Show_2", text()],
  ["Show_3", text()],
  ["Show_4", text()],
  ["Show_5", text()],
  ["Tab_1", text()],
  ["Tab_2", text()],
  ["Tab_3", text()],
  ["Tab_4", text()],
  ["Tab_5", text()],
  ["Text_1", text()],
  ["Text_2", text()],
  ["Text_3", text()],
  ["Text_4", text()],
  ["Text_5", text()],
  ["Title", int()],
  ["Type_1", text()],
  ["Type_2", text()],
  ["Type_3", text()],
  ["Type_4", text()],
  ["Type_5", text()],
  ["id", int()],
];

export const parseGainWayConfig = createSimpleListParser<IGainWayInfo, GainWayConfig>({
  name: "gainWay",
  outputPath: "./json/gainWay.json",
  dataKey: "data",
  itemSchema: gainWayInfoSchema,
});

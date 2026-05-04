import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutoOpenPanelInfo {
  actionName: string;
  controller: string;
  endTime: string;
  id: number;
  moduleId: number;
  param1: string;
  param2: string;
  param3: string;
  startTime: string;
  state: number;
}

export interface AutoOpenPanelConfig {
  data?: IAutoOpenPanelInfo[];
}

const autoOpenPanelInfoSchema: FieldSchema = [
  ["actionName", text()],
  ["controller", text()],
  ["endTime", text()],
  ["id", int()],
  ["moduleId", int()],
  ["param1", text()],
  ["param2", text()],
  ["param3", text()],
  ["startTime", text()],
  ["state", int()],
];

export const parseAutoOpenPanelConfig = createSimpleListParser<IAutoOpenPanelInfo, AutoOpenPanelConfig>({
  name: "autoOpenPanel",
  outputPath: "./json/autoOpenPanel.json",
  dataKey: "data",
  itemSchema: autoOpenPanelInfoSchema,
});

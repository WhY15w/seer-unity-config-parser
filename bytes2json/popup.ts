import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPopupInfo {
  daily: number;
  goto: string;
  id: number;
  num: number;
  pic: number;
  showEnd: string;
  showStart: string;
}

export interface PopupConfig {
  data?: IPopupInfo[];
}

const popupInfoSchema: FieldSchema = [
  ["daily", int()],
  ["goto", text()],
  ["id", int()],
  ["num", int()],
  ["pic", int()],
  ["showEnd", text()],
  ["showStart", text()],
];

export const parsePopupConfig = createSimpleListParser<IPopupInfo, PopupConfig>({
  name: "Popup",
  outputPath: "./json/Popup.json",
  dataKey: "data",
  itemSchema: popupInfoSchema,
});

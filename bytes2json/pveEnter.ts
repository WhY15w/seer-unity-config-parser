import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPveEnterInfo {
  id: number;
  isOpen: number;
  isShow: number;
  kind: number;
  moduleID: number;
  monsterid: number;
  openParam: string;
  order: number;
  pveName: string;
  res: string;
  reward: string;
  showType: number;
  statLog: string;
  timeLimit: string;
}

export interface PveEnterConfig {
  data?: IPveEnterInfo[];
}

const pveEnterInfoSchema: FieldSchema = [
  ["id", int()],
  ["isOpen", int()],
  ["isShow", int()],
  ["kind", int()],
  ["moduleID", int()],
  ["monsterid", int()],
  ["openParam", text()],
  ["order", int()],
  ["pveName", text()],
  ["res", text()],
  ["reward", text()],
  ["showType", int()],
  ["statLog", text()],
  ["timeLimit", text()],
];

export const parsePveEnterConfig = createSimpleListParser<IPveEnterInfo, PveEnterConfig>({
  name: "pveEnter",
  outputPath: "./json/pveEnter.json",
  dataKey: "data",
  itemSchema: pveEnterInfoSchema,
});

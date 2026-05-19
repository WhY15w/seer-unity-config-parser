import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAurumEndgameOptionsConfigInfo {
  attritube: string;
  desc: string;
  group: number;
  id: number;
  maxnum: number;
  name: string;
  branchid: number;
  rarity: number;
  related: number;
  root: number;
  treeid: number;
  type: number;
  value: number;
}

export interface AurumEndgameOptionsConfigConfig {
  data?: IAurumEndgameOptionsConfigInfo[];
}

const aurumEndgameOptionsConfigInfoSchema: FieldSchema = [
  ["attritube", text()],
  ["branchid", int()],
  ["desc", text()],
  ["group", int()],
  ["id", int()],
  ["maxnum", int()],
  ["name", text()],
  ["rarity", int()],
  ["related", int()],
  ["root", int()],
  ["treeid", int()],
  ["type", int()],
  ["value", int()],
];

export const parseAurumEndgameOptionsConfigConfig = createSimpleListParser<
  IAurumEndgameOptionsConfigInfo,
  AurumEndgameOptionsConfigConfig
>({
  name: "aurumEndgameOptionsConfig",
  outputPath: "./json/aurumEndgameOptionsConfig.json",
  dataKey: "data",
  itemSchema: aurumEndgameOptionsConfigInfoSchema,
});

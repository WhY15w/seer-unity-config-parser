import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewMonsterLevelTempInfo {
  difficult: number;
  fightType: number;
  hide: string;
  id: number;
  image: string;
  isnew: string;
  isrecommend?: number[];
  menutype?: number[];
  moduleid: number;
  monsterid: number;
  param: string;
  petTag?: number[];
  quality: string;
  recommendTime: string;
  sort: number;
  statlog: string;
  upgrade?: number[];
  upgradeHide: string;
  upgradeNew: string;
  upgradeSort: number;
  upgradeSource: number;
  weekly: number;
  weeklyAdd: number;
}

export interface NewMonsterLevelTempConfig {
  data?: INewMonsterLevelTempInfo[];
}

const newMonsterLevelTempInfoSchema: FieldSchema = [
  ["difficult", int()],
  ["fightType", int()],
  ["hide", text()],
  ["id", int()],
  ["image", text()],
  ["isnew", text()],
  ["isrecommend", optionalArray("int")],
  ["menutype", optionalArray("int")],
  ["moduleid", int()],
  ["monsterid", int()],
  ["param", text()],
  ["petTag", optionalArray("int")],
  ["quality", text()],
  ["recommendTime", text()],
  ["sort", int()],
  ["statlog", text()],
  ["upgrade", optionalArray("int")],
  ["upgradeHide", text()],
  ["upgradeNew", text()],
  ["upgradeSort", int()],
  ["upgradeSource", int()],
  ["weekly", int()],
  ["weeklyAdd", int()],
];

export const parseNewMonsterLevelTempConfig = createSimpleListParser<INewMonsterLevelTempInfo, NewMonsterLevelTempConfig>({
  name: "new_monster_level_temp",
  outputPath: "./json/new_monster_level_temp.json",
  dataKey: "data",
  itemSchema: newMonsterLevelTempInfoSchema,
});

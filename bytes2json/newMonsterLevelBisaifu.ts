import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface INewMonsterLevelBisaifuInfo {
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

export interface NewMonsterLevelBisaifuConfig {
  data?: INewMonsterLevelBisaifuInfo[];
}

const newMonsterLevelBisaifuInfoSchema: FieldSchema = [
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

export const parseNewMonsterLevelBisaifuConfig = createSimpleListParser<INewMonsterLevelBisaifuInfo, NewMonsterLevelBisaifuConfig>({
  name: "new_monster_level_bisaifu",
  outputPath: "./json/new_monster_level_bisaifu.json",
  dataKey: "data",
  itemSchema: newMonsterLevelBisaifuInfoSchema,
});

import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IMapdropInfo {
  activitydrop: string;
  activityid: number;
  activitylimit: string;
  drop: string;
  id: number;
  limit: string;
  mapid: number;
  monster: number;
}

export interface MapdropConfig {
  data?: IMapdropInfo[];
}

const mapdropInfoSchema: FieldSchema = [
  ["activitydrop", text()],
  ["activityid", int()],
  ["activitylimit", text()],
  ["drop", text()],
  ["id", int()],
  ["limit", text()],
  ["mapid", int()],
  ["monster", int()],
];

export const parseMapdropConfig = createSimpleListParser<IMapdropInfo, MapdropConfig>({
  name: "mapdrop",
  outputPath: "./json/mapdrop.json",
  dataKey: "data",
  itemSchema: mapdropInfoSchema,
});

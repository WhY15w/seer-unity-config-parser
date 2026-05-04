import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IArchivesStoryTempInfo {
  classid: number;
  classname: string;
  id: number;
  isrec: number;
  monid: number;
  monname: string;
  samemonid?: number[];
  storyid: number;
  txt: string;
}

export interface ArchivesStoryTempConfig {
  data?: IArchivesStoryTempInfo[];
}

const archivesStoryTempInfoSchema: FieldSchema = [
  ["classid", int()],
  ["classname", text()],
  ["id", int()],
  ["isrec", int()],
  ["monid", int()],
  ["monname", text()],
  ["samemonid", optionalArray("int")],
  ["storyid", int()],
  ["txt", text()],
];

export const parseArchivesStoryTempConfig = createSimpleListParser<IArchivesStoryTempInfo, ArchivesStoryTempConfig>({
  name: "archivesStory_temp",
  outputPath: "./json/archivesStory_temp.json",
  dataKey: "data",
  itemSchema: archivesStoryTempInfoSchema,
});

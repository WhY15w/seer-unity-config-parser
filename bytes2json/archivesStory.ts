import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IArchivesStoryInfo {
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

export interface ArchivesStoryConfig {
  data?: IArchivesStoryInfo[];
}

const archivesStoryInfoSchema: FieldSchema = [
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

export const parseArchivesStoryConfig = createSimpleListParser<IArchivesStoryInfo, ArchivesStoryConfig>({
  name: "archivesStory",
  outputPath: "./json/archivesStory.json",
  dataKey: "data",
  itemSchema: archivesStoryInfoSchema,
});

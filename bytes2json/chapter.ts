import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IChapterInfo {
  bgm: string;
  branch: number;
  chaptername: string;
  enddate: string;
  id: number;
  imagebg: string;
  imagelist: string;
  imagestage: string;
  img: string;
  intro: string;
  logo: string;
  needchapter: number;
  previouslyon: string;
  recordid: number;
  redbadge: number;
  startdate: string;
  tagname: string;
  tagopen: number;
  tagtype: number;
  tobe: number;
  type: number;
  upstory: number;
  writing: number;
  writingimg: string;
  writingname: string;
}

export interface ChapterConfig {
  data?: IChapterInfo[];
}

const chapterInfoSchema: FieldSchema = [
  ["bgm", text()],
  ["branch", int()],
  ["chaptername", text()],
  ["enddate", text()],
  ["id", int()],
  ["imagebg", text()],
  ["imagelist", text()],
  ["imagestage", text()],
  ["img", text()],
  ["intro", text()],
  ["logo", text()],
  ["needchapter", int()],
  ["previouslyon", text()],
  ["recordid", int()],
  ["redbadge", int()],
  ["startdate", text()],
  ["tagname", text()],
  ["tagopen", int()],
  ["tagtype", int()],
  ["tobe", int()],
  ["type", int()],
  ["upstory", int()],
  ["writing", int()],
  ["writingimg", text()],
  ["writingname", text()],
];

export const parseChapterConfig = createSimpleListParser<IChapterInfo, ChapterConfig>({
  name: "chapter",
  outputPath: "./json/chapter.json",
  dataKey: "data",
  itemSchema: chapterInfoSchema,
});

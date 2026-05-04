import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IArchivesBookInfo {
  bookid: number;
  chapterid: number;
  chaptername: string;
  id: number;
  txt?: string[];
  txtdivide?: number[];
}

export interface ArchivesBookConfig {
  data?: IArchivesBookInfo[];
}

const archivesBookInfoSchema: FieldSchema = [
  ["bookid", int()],
  ["chapterid", int()],
  ["chaptername", text()],
  ["id", int()],
  ["txt", optionalArray("text")],
  ["txtdivide", optionalArray("int")],
];

export const parseArchivesBookConfig = createSimpleListParser<IArchivesBookInfo, ArchivesBookConfig>({
  name: "archivesBook",
  outputPath: "./json/archivesBook.json",
  dataKey: "data",
  itemSchema: archivesBookInfoSchema,
});

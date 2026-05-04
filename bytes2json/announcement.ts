import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAnnouncementInfo {
  beginning: string;
  ending: string;
  id: number;
  shouldread: number;
  sorting: number;
  subtitle: string;
  text: string;
  title: string;
  type: number;
}

export interface AnnouncementConfig {
  data?: IAnnouncementInfo[];
}

const announcementInfoSchema: FieldSchema = [
  ["beginning", text()],
  ["ending", text()],
  ["id", int()],
  ["shouldread", int()],
  ["sorting", int()],
  ["subtitle", text()],
  ["text", text()],
  ["title", text()],
  ["type", int()],
];

export const parseAnnouncementConfig = createSimpleListParser<IAnnouncementInfo, AnnouncementConfig>({
  name: "announcement",
  outputPath: "./json/announcement.json",
  dataKey: "data",
  itemSchema: announcementInfoSchema,
});

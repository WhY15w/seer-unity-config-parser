import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface ILanternQuestionInfo {
  Achoose: string;
  Bchoose: string;
  Cchoose: string;
  Dchoose: string;
  answer: number;
  describe: string;
  id: number;
  title: number;
}

export interface ILanternQuestionRoot {
  data?: ILanternQuestionInfo[];
}

const lanternQuestionInfoSchema: FieldSchema = [
  ["Achoose", text()],
  ["Bchoose", text()],
  ["Cchoose", text()],
  ["Dchoose", text()],
  ["answer", int()],
  ["describe", text()],
  ["id", int()],
  ["title", int()],
];

export const parseLanternQuestionConfig =
  createConfigParser<ILanternQuestionRoot>({
    name: "lanternQuestion",
    outputPath: "./json/lanternQuestion.json",
    parse: (reader) => {
      const result: ILanternQuestionRoot = {};
      if (reader.boolean()) {
        const count = reader.int();
        if (count > 0) {
          result.data = Array.from({ length: count }, () =>
            parseBySchema<ILanternQuestionInfo>(
              reader,
              lanternQuestionInfoSchema
            )
          );
        }
      }
      return result;
    },
  });

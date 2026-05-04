import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutoCardbookInfo {
  BuffIcon: string;
  CardRecom: string;
  NatureId: number;
  Title: string;
  id: number;
}

export interface AutoCardbookConfig {
  data?: IAutoCardbookInfo[];
}

const autoCardbookInfoSchema: FieldSchema = [
  ["BuffIcon", text()],
  ["CardRecom", text()],
  ["NatureId", int()],
  ["Title", text()],
  ["id", int()],
];

export const parseAutoCardbookConfig = createSimpleListParser<IAutoCardbookInfo, AutoCardbookConfig>({
  name: "autoCardbook",
  outputPath: "./json/autoCardbook.json",
  dataKey: "data",
  itemSchema: autoCardbookInfoSchema,
});

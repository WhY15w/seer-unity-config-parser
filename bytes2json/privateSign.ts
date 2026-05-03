import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IPrivateSignInfo {
  day: number;
  id: number;
  intro: string;
  name: string;
  petId: number;
  reward?: number[];
  rewardPet?: number[];
}

export interface PrivateSignConfig {
  data?: IPrivateSignInfo[];
}

const privateSignInfoSchema: FieldSchema = [
  ["day", int()],
  ["id", int()],
  ["intro", text()],
  ["name", text()],
  ["petId", int()],
  ["reward", optionalArray("int")],
  ["rewardPet", optionalArray("int")],
];

export const parsePrivateSignConfig = createSimpleListParser<IPrivateSignInfo, PrivateSignConfig>({
  name: "privateSign",
  outputPath: "./json/privateSign.json",
  dataKey: "data",
  itemSchema: privateSignInfoSchema,
});

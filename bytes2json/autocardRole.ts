import {
  createSimpleListParser,
  text,
  int,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAutocardRoleInfo {
  BuffId: string;
  BuffParam: string;
  CountNum: number;
  Display: number;
  desc: string;
  health: number;
  id: number;
  name: string;
  nature: number;
  picID: number;
  skillCostNum: number;
  skillGameLimit: number;
  skillID: number;
  skillName: string;
  skillRoundLimit: number;
  skillTxt: string;
  skillType: number;
  skillUpgrade: string;
}

export interface AutocardRoleConfig {
  data?: IAutocardRoleInfo[];
}

const autocardRoleInfoSchema: FieldSchema = [
  ["BuffId", text()],
  ["BuffParam", text()],
  ["CountNum", int()],
  ["Display", int()],
  ["desc", text()],
  ["health", int()],
  ["id", int()],
  ["name", text()],
  ["nature", int()],
  ["picID", int()],
  ["skillCostNum", int()],
  ["skillGameLimit", int()],
  ["skillID", int()],
  ["skillName", text()],
  ["skillRoundLimit", int()],
  ["skillTxt", text()],
  ["skillType", int()],
  ["skillUpgrade", text()],
];

export const parseAutocardRoleConfig = createSimpleListParser<
  IAutocardRoleInfo,
  AutocardRoleConfig
>({
  name: "autocardRole",
  outputPath: "./json/autocardRole.json",
  dataKey: "data",
  itemSchema: autocardRoleInfoSchema,
});

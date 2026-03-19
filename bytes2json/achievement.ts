import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IRuleItem {
  AbilityTitle: number;
  AchievementPoint: number;
  Desc: string;
  ID: number;
  SpeNameBonus: number;
  Threshold: string;
  abtext: string;
  achName: string;
  hide: number;
  proicon: number;
  title: string;
  titleColor: string;
}

export interface IBranchItem {
  Desc: string;
  ID: number;
  IsSingle: number;
  Rule?: IRuleItem[];
  _text: string;
  isShowPro: number;
}

export interface IBranchesItem {
  Branch?: IBranchItem[];
}

export interface ITypeItem {
  Branches?: IBranchesItem[];
  Desc: string;
  ID: number;
}

export interface IAchievementRules {
  type?: ITypeItem[];
}

export interface IRootInterface {
  AchievementRules?: IAchievementRules;
}

const ruleItemSchema: FieldSchema = [
  ["AbilityTitle", int()],
  ["AchievementPoint", int()],
  ["Desc", text()],
  ["ID", int()],
  ["SpeNameBonus", int()],
  ["Threshold", text()],
  ["abtext", text()],
  ["achName", text()],
  ["hide", int()],
  ["proicon", int()],
  ["title", text()],
  ["titleColor", text()],
];

const branchItemSchema: FieldSchema = [
  ["Desc", text()],
  ["ID", int()],
  ["IsSingle", int()],
  ["Rule", optionalArrayStruct(ruleItemSchema)],
  ["_text", text()],
  ["isShowPro", int()],
];

const branchesItemSchema: FieldSchema = [
  ["Branch", optionalArrayStruct(branchItemSchema)],
];

const typeItemSchema: FieldSchema = [
  ["Branches", optionalArrayStruct(branchesItemSchema)],
  ["Desc", text()],
  ["ID", int()],
];

const achievementRulesSchema: FieldSchema = [
  ["type", optionalArrayStruct(typeItemSchema)],
];

export const parseAchievements = createConfigParser<IRootInterface>({
  name: "achievements",
  outputPath: "./json/achievements.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      console.log("achievementCount: parsing...");
      result.AchievementRules = parseBySchema<IAchievementRules>(
        reader,
        achievementRulesSchema
      );
    }
    return result;
  },
});

import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArray,
  optionalArrayStruct,
  optionalObject,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IAchievement {
  BranchID: number;
  RuleID: number;
}

export interface IConfigure {
  ExchangeID?: number[];
  ExchangeProductID?: number[];
  Exchange_mintmark: number;
  FailTimes: number;
  needmon: number;
  ProgressValue: number;
  Times: number;
  TimeValue: number;
}

export interface ITaskItem {
  Desc: string;
  BattleBoss: number;
  Battlelevel: number;
  BattleType: number;
  ID: number;
}

export interface IEasyBattle {
  Desc: string;
  Task?: ITaskItem[];
  BattleCnt: number;
  Out: number;
  TaskStyle: number;
}

export interface INormalBattle {
  Desc: string;
  RuleID: string;
  Task?: ITaskItem[];
  BattleCnt: number;
  Out: number;
  TaskStyle: number;
}

export interface IReward {
  GainValue: number;
  ItemID: number;
  MintMarkID: number;
  MonsterID: number;
}

export interface IRuleItem {
  Args: string;
  CheckTips: string;
  FailTips: string;
  RepeatTips: string;
  UserInfo: string;
  ID: number;
  MouldID: number;
}

export interface IRules {
  Rule?: IRuleItem[];
}

export interface ISweep {
  ProductID?: number[];
}

export interface IDesignItem {
  Achievement?: IAchievement;
  Configure?: IConfigure;
  EasyBattle?: IEasyBattle;
  HardBattle?: INormalBattle;
  NormalBattle?: INormalBattle;
  Reward?: IReward;
  Rules?: IRules;
  Sweep?: ISweep;
  ID: number;
}

export interface IRoot {
  Design?: IDesignItem[];
}

export interface IRootInterface {
  Root?: IRoot;
}

const achievementSchema: FieldSchema = [
  ["BranchID", int()],
  ["RuleID", int()],
];

const configureSchema: FieldSchema = [
  ["ExchangeID", optionalArray("int")],
  ["ExchangeProductID", optionalArray("int")],
  ["Exchange_mintmark", int()],
  ["FailTimes", int()],
  ["ProgressValue", int()],
  ["TimeValue", int()],
  ["Times", int()],
  ["needmon", int()],
];

const taskItemSchema: FieldSchema = [
  ["BattleBoss", int()],
  ["BattleType", int()],
  ["Battlelevel", int()],
  ["Desc", text()],
  ["ID", int()],
];

const easyBattleSchema: FieldSchema = [
  ["BattleCnt", int()],
  ["Desc", text()],
  ["Out", int()],
  ["Task", optionalArrayStruct(taskItemSchema)],
  ["TaskStyle", int()],
];

const normalBattleSchema: FieldSchema = [
  ["BattleCnt", int()],
  ["Desc", text()],
  ["Out", int()],
  ["RuleID", text()],
  ["Task", optionalArrayStruct(taskItemSchema)],
  ["TaskStyle", int()],
];

const rewardSchema: FieldSchema = [
  ["GainValue", int()],
  ["ItemID", int()],
  ["MintMarkID", int()],
  ["MonsterID", int()],
];

const ruleItemSchema: FieldSchema = [
  ["Args", text()],
  ["CheckTips", text()],
  ["FailTips", text()],
  ["ID", int()],
  ["MouldID", int()],
  ["RepeatTips", text()],
  ["UserInfo", text()],
];

const rulesSchema: FieldSchema = [
  ["Rule", optionalArrayStruct(ruleItemSchema)],
];

const sweepSchema: FieldSchema = [["ProductID", optionalArray("int")]];

const designItemSchema: FieldSchema = [
  ["Achievement", optionalObject(achievementSchema)],
  ["Configure", optionalObject(configureSchema)],
  ["EasyBattle", optionalObject(easyBattleSchema)],
  ["HardBattle", optionalObject(normalBattleSchema)],
  ["ID", int()],
  ["NormalBattle", optionalObject(normalBattleSchema)],
  ["Reward", optionalObject(rewardSchema)],
  ["Rules", optionalObject(rulesSchema)],
  ["Sweep", optionalObject(sweepSchema)],
];

const rootSchema: FieldSchema = [
  ["Design", optionalArrayStruct(designItemSchema)],
];

export const parseNewSuperDesignConfig = createConfigParser<IRootInterface>({
  name: "newSuperDesign",
  outputPath: "./json/new_super_design.json",
  parse: (reader) => {
    const root: IRootInterface = {};
    if (reader.boolean()) {
      root.Root = parseBySchema<IRoot>(reader, rootSchema);
    }
    return root;
  },
});

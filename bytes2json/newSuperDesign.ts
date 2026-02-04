import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

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

function parseIAchievement(reader: BytesReader): IAchievement {
  return {
    BranchID: reader.int(),
    RuleID: reader.int(),
  };
}

function parseIConfigure(reader: BytesReader): IConfigure {
  const res: IConfigure = {
    ExchangeID: undefined,
    ExchangeProductID: undefined,
    Exchange_mintmark: 0,
    FailTimes: 0,
    ProgressValue: 0,
    TimeValue: 0,
    Times: 0,
    needmon: 0,
  };

  if (reader.boolean()) {
    const num = reader.int();
    res.ExchangeID = Array.from({ length: num }, () => reader.int());
  }
  if (reader.boolean()) {
    const num = reader.int();
    res.ExchangeProductID = Array.from({ length: num }, () => reader.int());
  }
  res.Exchange_mintmark = reader.int();
  res.FailTimes = reader.int();
  res.ProgressValue = reader.int();
  res.TimeValue = reader.int();
  res.Times = reader.int();
  res.needmon = reader.int();

  return res;
}

function parseITaskItem(reader: BytesReader): ITaskItem {
  return {
    BattleBoss: reader.int(),
    BattleType: reader.int(),
    Battlelevel: reader.int(),
    Desc: reader.text(),
    ID: reader.int(),
  };
}

function parseIEasyBattle(reader: BytesReader): IEasyBattle {
  const res: IEasyBattle = {
    BattleCnt: reader.int(),
    Desc: reader.text(),
    Out: reader.int(),
    Task: undefined,
    TaskStyle: 0,
  };

  if (reader.boolean()) {
    const num = reader.int();
    res.Task = Array.from({ length: num }, () => parseITaskItem(reader));
  }
  res.TaskStyle = reader.int();

  return res;
}

function parseINormalBattle(reader: BytesReader): INormalBattle {
  const res: INormalBattle = {
    BattleCnt: reader.int(),
    Desc: reader.text(),
    Out: reader.int(),
    RuleID: reader.text(),
    Task: undefined,
    TaskStyle: 0,
  };

  if (reader.boolean()) {
    const num = reader.int();
    res.Task = Array.from({ length: num }, () => parseITaskItem(reader));
  }
  res.TaskStyle = reader.int();

  return res;
}

function parseIReward(reader: BytesReader): IReward {
  return {
    GainValue: reader.int(),
    ItemID: reader.int(),
    MintMarkID: reader.int(),
    MonsterID: reader.int(),
  };
}

function parseIRuleItem(reader: BytesReader): IRuleItem {
  return {
    Args: reader.text(),
    CheckTips: reader.text(),
    FailTips: reader.text(),
    ID: reader.int(),
    MouldID: reader.int(),
    RepeatTips: reader.text(),
    UserInfo: reader.text(),
  };
}

function parseIRules(reader: BytesReader): IRules {
  const res: IRules = {};
  if (reader.boolean()) {
    const num = reader.int();
    res.Rule = Array.from({ length: num }, () => parseIRuleItem(reader));
  }
  return res;
}

function parseISweep(reader: BytesReader): ISweep {
  const res: ISweep = {};
  if (reader.boolean()) {
    const num = reader.int();
    res.ProductID = Array.from({ length: num }, () => reader.int());
  }
  return res;
}

function parseIDesignItem(reader: BytesReader): IDesignItem {
  const item: IDesignItem = {
    Achievement: reader.boolean() ? parseIAchievement(reader) : undefined,
    Configure: reader.boolean() ? parseIConfigure(reader) : undefined,
    EasyBattle: reader.boolean() ? parseIEasyBattle(reader) : undefined,
    HardBattle: reader.boolean() ? parseINormalBattle(reader) : undefined,
    ID: reader.int(),
    NormalBattle: reader.boolean() ? parseINormalBattle(reader) : undefined,
    Reward: reader.boolean() ? parseIReward(reader) : undefined,
    Rules: reader.boolean() ? parseIRules(reader) : undefined,
    Sweep: reader.boolean() ? parseISweep(reader) : undefined,
  };

  return item;
}

function parseIRoot(reader: BytesReader): IRoot {
  const designs: IDesignItem[] = [];
  if (reader.boolean()) {
    const count = reader.int();
    console.log("designCount:", count);
    for (let i = 0; i < count; i++) {
      designs.push(parseIDesignItem(reader));
    }
  }
  return { Design: designs };
}

export async function parseNewSuperDesignConfig(
  filePath: string
): Promise<IRootInterface> {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const reader = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const root: IRootInterface = { Root: undefined };

  if (reader.boolean()) {
    root.Root = parseIRoot(reader);
  }

  saveAsJson(root, "./json/new_super_design.json");
  return root;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

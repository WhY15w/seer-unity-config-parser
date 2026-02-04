import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "../utils/BytesReader";

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
  // 额外字段
  branchId?: number;
  branchDesc?: string;
  isShowPro?: number;
  IsSingle?: number;
  type?: number;
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

function parseIRuleItem(r: BytesReader): IRuleItem {
  return {
    AbilityTitle: r.int(),
    AchievementPoint: r.int(),
    Desc: r.text(),
    ID: r.int(),
    SpeNameBonus: r.int(),
    Threshold: r.text(),
    abtext: r.text(),
    achName: r.text(),
    hide: r.int(),
    proicon: r.int(),
    title: r.text(),
    titleColor: r.text(),
  };
}

function parseIBranchItem(r: BytesReader): IBranchItem {
  const Desc = r.text();
  const ID = r.int();
  const IsSingle = r.int();
  let Rule: IRuleItem[] | undefined;

  if (r.boolean()) {
    const n = r.int();
    Rule = Array.from({ length: n }, () => parseIRuleItem(r));
  }

  const _text = r.text();
  const isShowPro = r.int();

  return { Desc, ID, IsSingle, Rule, _text, isShowPro };
}

function parseIBranchesItem(r: BytesReader): IBranchesItem {
  if (!r.boolean()) return {};
  const n = r.int();
  return { Branch: Array.from({ length: n }, () => parseIBranchItem(r)) };
}

function parseITypeItem(r: BytesReader): ITypeItem {
  let Branches: IBranchesItem[] | undefined;
  if (r.boolean()) {
    const n = r.int();
    Branches = Array.from({ length: n }, () => parseIBranchesItem(r));
  }
  const Desc = r.text();
  const ID = r.int();
  return { Branches, Desc, ID };
}

function parseIAchievementRules(r: BytesReader): IAchievementRules {
  if (!r.boolean()) return {};
  const n = r.int();
  console.log("achievementCount:", n);
  return { type: Array.from({ length: n }, () => parseITypeItem(r)) };
}

export function parseAchievements(filePath: string): IRootInterface {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const r = new BytesReader(new Uint8Array(arrBuf), {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  let AchievementRules: IAchievementRules | undefined;
  if (r.boolean()) {
    AchievementRules = parseIAchievementRules(r);
  }
  const result: IRootInterface = { AchievementRules };
  saveAsJson(result, "./json/achievements.json");
  return result;
}

function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

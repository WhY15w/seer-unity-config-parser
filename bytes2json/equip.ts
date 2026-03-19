import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

export interface IRankItem {
  Desc: string;
  Lv: number;
}

export interface IEquipItem {
  Desc: string;
  Name: string;
  Rank?: IRankItem[];
  ItemID: number;
  Quality: number;
  SuitID: number;
}

export interface IEquips {
  Equip: IEquipItem[];
}

export interface IRootInterface {
  Equips?: IEquips;
}

const rankItemSchema: FieldSchema = [
  ["Desc", text()],
  ["Lv", int()],
];

const equipItemSchema: FieldSchema = [
  ["Desc", text()],
  ["ItemID", int()],
  ["Name", text()],
  ["Quality", int()],
  ["Rank", optionalArrayStruct(rankItemSchema)],
  ["SuitID", int()],
];

export const parseEquipConfig = createConfigParser<IRootInterface>({
  name: "equip",
  outputPath: "./json/equip.json",
  parse: (reader) => {
    const result: IRootInterface = {};
    if (reader.boolean()) {
      const equips: IEquipItem[] = [];
      if (reader.boolean()) {
        const num = reader.int();
        for (let i = 0; i < num; i++) {
          equips.push(parseBySchema<IEquipItem>(reader, equipItemSchema));
        }
      }
      result.Equips = { Equip: equips };
    }
    return result;
  },
});

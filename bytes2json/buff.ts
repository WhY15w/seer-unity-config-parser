import { BytesReader, LengthType } from "../utils/BytesReader";

interface IBuffInfo {
  Desc: string;
  Tag: string;
  desc_tag: string;
  icon?: number[];
  icontype: number;
  id: number;
}

interface BuffConfig {
  data?: IBuffInfo[];
}

export function parseBuffConfig(data: Uint8Array): BuffConfig {
  const result: BuffConfig = {};
  const reader = new BytesReader(data, {
    lengthType: LengthType.Uint16,
    littleEndian: true,
  });

  const hasBuffInfoArray = reader.boolean();

  if (hasBuffInfoArray) {
    const buffInfoCount = reader.int();
    console.log("buffInfoCount:", buffInfoCount, reader.offset);
    result.data = [];
    for (let i = 0; i < buffInfoCount; i++) {
      result.data.push(parseIBuffInfo(reader));
    }
  }

  return result;
}

function parseIBuffInfo(reader: BytesReader): IBuffInfo {
  const buffInfo: IBuffInfo = {} as IBuffInfo;

  buffInfo.Desc = reader.text();

  buffInfo.Tag = reader.text();

  buffInfo.desc_tag = reader.text();

  const hasIcon = reader.boolean();

  if (hasIcon) {
    const iconCount = reader.int();
    buffInfo.icon = new Array(iconCount);
    for (let j = 0; j < iconCount; j++) {
      buffInfo.icon[j] = reader.int();
    }
  }

  buffInfo.icontype = reader.int();
  buffInfo.id = reader.int();

  return buffInfo;
}

/**
 * 通用配置解析模板
 *
 * 将二进制解析的重复模式抽象为声明式 Schema，新增解析器只需定义字段描述，
 * 无需编写重复的读取/文件IO/JSON保存逻辑。
 */

import * as fs from "fs";
import * as path from "path";
import { BytesReader, LengthType } from "./BytesReader";

// ============ Schema 类型定义 ============

/** 基本读取类型 */
export type PrimitiveType =
  | "int"
  | "uint"
  | "short"
  | "ushort"
  | "byte"
  | "long"
  | "ulong"
  | "float"
  | "double"
  | "text"
  | "boolean";

/**
 * 字段定义：描述一个字段如何从二进制流中读取。
 *
 * - type: 基本类型的字段，直接读取
 * - array: 可选数组字段 (boolean + count + items)
 * - object: 可选对象字段 (boolean + parseObject)
 * - struct: 内嵌结构体字段，递归使用 FieldSchema
 * - custom: 自定义读取逻辑，用于特殊场景
 */
export type FieldDef =
  | { kind: "primitive"; type: PrimitiveType }
  | { kind: "array"; itemType: PrimitiveType }
  | { kind: "arrayStruct"; itemSchema: FieldSchema }
  | { kind: "optionalArray"; itemType: PrimitiveType }
  | { kind: "optionalArrayStruct"; itemSchema: FieldSchema }
  | { kind: "optionalObject"; schema: FieldSchema }
  | { kind: "struct"; schema: FieldSchema }
  | { kind: "custom"; read: (reader: BytesReader) => any };

/**
 * FieldSchema：字段名 -> 字段定义
 *
 * 注意：字段按声明顺序读取（Map 保持插入顺序），
 * 请务必按照二进制数据的字段顺序定义。
 */
export type FieldSchema = [string, FieldDef][];

// ============ Schema 辅助构建函数（简化声明） ============

/** 读取 int32 */
export const int = (): FieldDef => ({ kind: "primitive", type: "int" });

/** 读取 uint32 */
export const uint = (): FieldDef => ({ kind: "primitive", type: "uint" });

/** 读取 int16 */
export const short = (): FieldDef => ({ kind: "primitive", type: "short" });

/** 读取 uint16 */
export const ushort = (): FieldDef => ({ kind: "primitive", type: "ushort" });

/** 读取 byte */
export const byte = (): FieldDef => ({ kind: "primitive", type: "byte" });

/** 读取 int64 */
export const long = (): FieldDef => ({ kind: "primitive", type: "long" });

/** 读取 uint64 */
export const ulong = (): FieldDef => ({ kind: "primitive", type: "ulong" });

/** 读取 float32 */
export const float = (): FieldDef => ({ kind: "primitive", type: "float" });

/** 读取 float64 */
export const double = (): FieldDef => ({ kind: "primitive", type: "double" });

/** 读取文本字符串 */
export const text = (): FieldDef => ({ kind: "primitive", type: "text" });

/** 读取 boolean */
export const boolean = (): FieldDef => ({ kind: "primitive", type: "boolean" });

/**
 * 可选基本类型数组: boolean + count + items
 * 匹配模式:
 * ```
 * if (reader.boolean()) {
 *   const count = reader.int();
 *   arr = Array.from({ length: count }, () => reader.int());
 * }
 * ```
 */
export const optionalArray = (itemType: PrimitiveType = "int"): FieldDef => ({
  kind: "optionalArray",
  itemType,
});

/**
 * 可选结构体数组: boolean + count + items(每项按 schema 读取)
 * 匹配模式:
 * ```
 * if (reader.boolean()) {
 *   const count = reader.int();
 *   arr = Array.from({ length: count }, () => parseItem(reader));
 * }
 * ```
 */
export const optionalArrayStruct = (itemSchema: FieldSchema): FieldDef => ({
  kind: "optionalArrayStruct",
  itemSchema,
});

/**
 * 必选基本类型数组（无 boolean 守卫，直接读 count + items）
 */
export const array = (itemType: PrimitiveType = "int"): FieldDef => ({
  kind: "array",
  itemType,
});

/**
 * 必选结构体数组（无 boolean 守卫，直接读 count + items）
 */
export const arrayStruct = (itemSchema: FieldSchema): FieldDef => ({
  kind: "arrayStruct",
  itemSchema,
});

/**
 * 可选对象: boolean + parseObject(schema)
 */
export const optionalObject = (schema: FieldSchema): FieldDef => ({
  kind: "optionalObject",
  schema,
});

/**
 * 内嵌结构体（始终读取，无 boolean 守卫）
 */
export const struct = (schema: FieldSchema): FieldDef => ({
  kind: "struct",
  schema,
});

/**
 * 自定义读取逻辑
 */
export const custom = (read: (reader: BytesReader) => any): FieldDef => ({
  kind: "custom",
  read,
});

// ============ 核心解析引擎 ============

/** 读取一个基本类型的值 */
function readPrimitive(reader: BytesReader, type: PrimitiveType): any {
  switch (type) {
    case "int":
      return reader.int();
    case "uint":
      return reader.uint();
    case "short":
      return reader.short();
    case "ushort":
      return reader.ushort();
    case "byte":
      return reader.byte();
    case "long":
      return reader.long();
    case "ulong":
      return reader.ulong();
    case "float":
      return reader.float();
    case "double":
      return reader.double();
    case "text":
      return reader.text();
    case "boolean":
      return reader.boolean();
  }
}

/** 根据 Schema 从 BytesReader 中解析出一个对象 */
export function parseBySchema<T = any>(
  reader: BytesReader,
  schema: FieldSchema,
): T {
  const result: Record<string, any> = {};

  for (const [fieldName, fieldDef] of schema) {
    switch (fieldDef.kind) {
      case "primitive":
        result[fieldName] = readPrimitive(reader, fieldDef.type);
        break;

      case "array": {
        const count = reader.int();
        result[fieldName] = Array.from({ length: count }, () =>
          readPrimitive(reader, fieldDef.itemType),
        );
        break;
      }

      case "arrayStruct": {
        const count = reader.int();
        result[fieldName] = Array.from({ length: count }, () =>
          parseBySchema(reader, fieldDef.itemSchema),
        );
        break;
      }

      case "optionalArray": {
        if (reader.boolean()) {
          const count = reader.int();
          result[fieldName] = Array.from({ length: count }, () =>
            readPrimitive(reader, fieldDef.itemType),
          );
        }
        break;
      }

      case "optionalArrayStruct": {
        if (reader.boolean()) {
          const count = reader.int();

          result[fieldName] = Array.from({ length: count }, () =>
            parseBySchema(reader, fieldDef.itemSchema),
          );
        }
        break;
      }

      case "optionalObject": {
        if (reader.boolean()) {
          result[fieldName] = parseBySchema(reader, fieldDef.schema);
        }
        break;
      }

      case "struct":
        result[fieldName] = parseBySchema(reader, fieldDef.schema);
        break;

      case "custom":
        result[fieldName] = fieldDef.read(reader);
        break;
    }
  }

  return result as T;
}

// ============ 文件 IO 工具 ============

/** 从文件读取并创建 BytesReader */
export function createReaderFromFile(
  filePath: string,
  options?: { lengthType?: LengthType; littleEndian?: boolean },
): BytesReader {
  const buffer = fs.readFileSync(filePath);
  const arrBuf = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
  return new BytesReader(new Uint8Array(arrBuf), {
    lengthType: options?.lengthType ?? LengthType.Uint16,
    littleEndian: options?.littleEndian ?? true,
  });
}

/** 保存为 JSON 文件 */
export function saveAsJson(data: any, outputPath: string) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

// ============ 通用解析器工厂 ============

export interface ConfigParserOptions<T> {
  /** 配置名称，用于日志 */
  name: string;
  /** JSON 输出路径 */
  outputPath: string;
  /** 根解析逻辑：从 BytesReader 解析出最终结果 */
  parse: (reader: BytesReader) => T;
  /** BytesReader 选项 */
  readerOptions?: { lengthType?: LengthType; littleEndian?: boolean };
}

/**
 * 创建一个标准的配置解析函数。
 *
 * @example
 * ```ts
 * export const parseBuffConfig = createConfigParser({
 *   name: "buff",
 *   outputPath: "./json/buff.json",
 *   parse: (reader) => {
 *     if (!reader.boolean()) return {};
 *     const count = reader.int();
 *     return { data: Array.from({ length: count }, () => parseBySchema(reader, buffInfoSchema)) };
 *   },
 * });
 * ```
 */
export function createConfigParser<T>(
  options: ConfigParserOptions<T>,
): (filePath: string) => T {
  return (filePath: string): T => {
    const reader = createReaderFromFile(filePath, options.readerOptions);
    const result = options.parse(reader);
    saveAsJson(result, options.outputPath);
    return result;
  };
}

/**
 * 快速创建"根对象包含一个可选数组列表"模式的解析器。
 *
 * 适用于大多数简单配置，二进制结构为:
 *   boolean (hasData) + int (count) + items[count]
 *
 * @example
 * ```ts
 * export const parseBuffConfig = createSimpleListParser<IBuffInfo>({
 *   name: "buff",
 *   outputPath: "./json/buff.json",
 *   dataKey: "data",
 *   itemSchema: buffInfoSchema,
 * });
 * ```
 */
export function createSimpleListParser<
  TItem,
  TRoot = Record<string, any>,
>(options: {
  name: string;
  outputPath: string;
  /** 数组在根对象中的键名 */
  dataKey: string;
  /** 每一项的字段 Schema */
  itemSchema: FieldSchema;
  /** BytesReader 选项 */
  readerOptions?: { lengthType?: LengthType; littleEndian?: boolean };
}): (filePath: string) => TRoot {
  return createConfigParser<TRoot>({
    name: options.name,
    outputPath: options.outputPath,
    readerOptions: options.readerOptions,
    parse: (reader) => {
      const result: Record<string, any> = {};
      if (reader.boolean()) {
        const count = reader.int();
        console.log(`${options.name}Count:`, count);
        if (count > 0) {
          result[options.dataKey] = Array.from({ length: count }, () =>
            parseBySchema<TItem>(reader, options.itemSchema),
          );
        }
      }
      return result as TRoot;
    },
  });
}

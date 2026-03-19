# 通用配置解析模板

## 概述

`utils/ConfigParserTemplate.ts` 将所有解析文件中的重复模式抽象为声明式 Schema，消除了大量样板代码。

## 核心概念

### 1. FieldSchema — 声明字段读取顺序和类型

```ts
const schema: FieldSchema = [
  ["fieldName", int()],
  ["name", text()],
  ["items", optionalArray("int")],
];
```

> ⚠️ 字段顺序必须与二进制数据中的字段顺序完全一致！

### 2. 字段类型助手函数

| 函数                          | 说明             | 对应二进制操作                           |
| ----------------------------- | ---------------- | ---------------------------------------- |
| `int()`                       | 读取 int32       | `reader.int()`                           |
| `uint()`                      | 读取 uint32      | `reader.uint()`                          |
| `short()`                     | 读取 int16       | `reader.short()`                         |
| `ushort()`                    | 读取 uint16      | `reader.ushort()`                        |
| `byte()`                      | 读取 byte        | `reader.byte()`                          |
| `long()`                      | 读取 int64       | `reader.long()`                          |
| `ulong()`                     | 读取 uint64      | `reader.ulong()`                         |
| `float()`                     | 读取 float32     | `reader.float()`                         |
| `double()`                    | 读取 float64     | `reader.double()`                        |
| `text()`                      | 读取 UTF8 字符串 | `reader.text()`                          |
| `boolean()`                   | 读取布尔值       | `reader.boolean()`                       |
| `optionalArray(type)`         | 可选基本类型数组 | `if (bool) { count + items }`            |
| `optionalArrayStruct(schema)` | 可选结构体数组   | `if (bool) { count + structItems }`      |
| `array(type)`                 | 必选基本类型数组 | `count + items`（无 boolean 守卫）       |
| `arrayStruct(schema)`         | 必选结构体数组   | `count + structItems`（无 boolean 守卫） |
| `optionalObject(schema)`      | 可选嵌套对象     | `if (bool) { parseStruct }`              |
| `struct(schema)`              | 必选嵌套结构体   | 直接 parseStruct                         |
| `custom(fn)`                  | 自定义读取逻辑   | `fn(reader)`                             |

### 3. 解析器工厂

- **`createConfigParser(options)`** — 通用工厂，适合所有场景
- **`createSimpleListParser(options)`** — 快捷工厂，适合 `boolean + count + items[]` 的简单列表配置

## 使用示例

### 简单列表配置（如 buff、skillEffect）

```ts
import {
  createSimpleListParser,
  text,
  int,
  optionalArray,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

interface IBuffInfo {
  Desc: string;
  Tag: string;
  icon?: number[];
  id: number;
}

const buffInfoSchema: FieldSchema = [
  ["Desc", text()],
  ["Tag", text()],
  ["icon", optionalArray("int")],
  ["id", int()],
];

export const parseBuffConfig = createSimpleListParser<IBuffInfo>({
  name: "buff",
  outputPath: "./json/buff.json",
  dataKey: "data",
  itemSchema: buffInfoSchema,
});
```

### 带嵌套结构的配置（如 equip、monsters）

```ts
import {
  createConfigParser,
  parseBySchema,
  text,
  int,
  optionalArrayStruct,
  type FieldSchema,
} from "../utils/ConfigParserTemplate";

const rankItemSchema: FieldSchema = [
  ["Desc", text()],
  ["Lv", int()],
];

const equipItemSchema: FieldSchema = [
  ["Desc", text()],
  ["ItemID", int()],
  ["Rank", optionalArrayStruct(rankItemSchema)],
  ["SuitID", int()],
];

export const parseEquipConfig = createConfigParser<IRootInterface>({
  name: "equip",
  outputPath: "./json/equip.json",
  parse: (reader) => {
    const result = {};
    if (reader.boolean()) {
      // 自定义根结构的读取逻辑
      const equips = [];
      if (reader.boolean()) {
        const num = reader.int();
        for (let i = 0; i < num; i++) {
          equips.push(parseBySchema(reader, equipItemSchema));
        }
      }
      result.Equips = { Equip: equips };
    }
    return result;
  },
});
```

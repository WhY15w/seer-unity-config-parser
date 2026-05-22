# seer-unity-config-parser

赛尔号 Unity 配置包的简易解析器，用于从 Unity 资源包中提取和解析配置数据。

本项目为[赛尔号信息聚合页](https://seerinfo.yuyuqaq.cn/)的衍生子项目

## 功能特性

-  自动更新配置包版本
-  Unity 资源包解析（使用 Python UnityPy）
-  二进制配置文件解析

## 项目结构

```
├── bytes2json/          # 二进制转 JSON 解析器
├── parser/              # 下载 & Unity 资源包解析
│   ├── updater/         # YooAsset 版本管理 & 下载器
│   ├── index.ts         # 更新入口
│   └── UnityFSParser.py # Unity 资源包提取
├── main/index.ts        # 批量转换入口（注册所有解析器）
├── scripts/             # 后处理脚本
│   ├── validate-json.ts
│   ├── detect-changes.ts
│   └── mergeItemsOptimizeCatItems.ts
├── utils/               # 工具类
│   ├── BytesReader.ts
│   ├── ConfigParserTemplate.ts   # 声明式 Schema 解析模板
│   └── feishu.ts                 # 飞书告警
├── cache/               # 哈希缓存
├── json/                # 输出 JSON（gitignored）
└── ConfigPackage/       # 下载的原始配置包（gitignored）
```

## 快速开始

### 安装依赖

```bash
pnpm install

pip install -r requirements.txt
```

### 运行完整流程

```bash
pnpm start
```

这将依次执行：
1. `update` — 下载最新配置包到 `ConfigPackage/`
2. `export` — 提取 Unity 资源包中的 `.bytes` 文件
3. `main` — 将 `.bytes` 解析为 JSON
4. `mergeItemsOptimizeCatItems` — 合并两个物品分类文件
5. `validate` — 校验 JSON 结构
6. `detect-changes` — 对比缓存哈希，输出变更

### 分步执行

```bash
# 1. 更新配置包
pnpm run update

# 2. 解析 Unity 资源包
pnpm run export

# 3. 批量转换为 JSON
pnpm run main

# 仅执行前三步（无校验/变更检测）
pnpm run dev
```

## 使用示例

### 解析 buff 配置

参考 `bytes2json/buff.ts` 的实现模式，使用 `ConfigParserTemplate` 声明式 Schema：

```typescript
import { createSimpleListParser, text, int, optionalArray } from "../utils/ConfigParserTemplate";

const schema = [
  ["Desc", text()],
  ["Tag", text()],
  ["icon", optionalArray("int")],
  ["id", int()],
];

export const parseBuffConfig = createSimpleListParser({
  name: "buff",
  outputPath: "./json/buff.json",
  dataKey: "data",
  itemSchema: schema,
});
```

### 添加新的配置解析器

1. 在 `bytes2json/` 下创建解析器，优先使用 `ConfigParserTemplate` 提供的 `createSimpleListParser` 或 `createConfigParser`
2. 在 `main/index.ts` 中 `import` 并用 `safeRun()` 注册
3. 可选的：`scripts/validate-json.ts` 中补充校验规则

### 调试模式

BytesReader 支持调试模式，可以追踪读取过程：

```typescript
const reader = new BytesReader(data, options, "debug-tag");
```

## API 文档

### BytesReader

二进制数据读取器，默认 **小端序**，文本长度前缀为 `Uint16`：

- `boolean()` / `byte()` / `short()` / `ushort()`
- `int()` / `uint()` / `long()` / `ulong()`
- `float()` / `double()` / `text()`

### ConfigParserTemplate

声明式 Schema 模板，支持 `int`/`uint`/`short`/`ushort`/`byte`/`long`/`ulong`/`float`/`double`/`text`/`boolean` 基本类型，以及 `optionalArray`/`array`/`optionalArrayStruct`/`arrayStruct`/`optionalObject`/`struct`/`custom` 复合类型。详见 `utils/ConfigParserTemplate.ts`。

## 持续集成

GitHub Action 每周五（12:00/14:00 CST）自动运行完整流程，检测到 JSON 变更自动提交。支持 `workflow_dispatch` 手动触发。

## 致谢

- <https://github.com/median-dxz/assets-manifest-praser>
- <https://github.com/SeerAPI/Albi0>
- <https://github.com/K0lb3/UnityPy>

## 许可证

ISC License

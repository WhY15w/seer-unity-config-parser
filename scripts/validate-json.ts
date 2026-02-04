#!/usr/bin/env node

/**
 * JSON 文件验证脚本
 * 验证生成的 JSON 文件是否有效且包含预期的数据结构
 */

import fs from "fs";
import path from "path";

const jsonDir = "./json";
const expectedFiles = [
  "achievements.json",
  "buff.json",
  "monsters.json",
  "moves.json",
];

// 验证配置
const validationConfig = {
  "achievements.json": {
    requiredKeys: ["AchievementRules"],
    minSize: 1000, // 最小文件大小（字节）
  },
  "buff.json": {
    requiredKeys: ["data"],
    minSize: 500,
  },
  "monsters.json": {
    requiredKeys: ["Monsters"],
    minSize: 10000, 
  },
  "moves.json": {
    requiredKeys: ["MovesTbl"],
    minSize: 5000,
  },
};

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    size: number;
    records?: number;
  };
}

function validateJsonFile(filePath: string): ValidationResult {
  const fileName = path.basename(filePath);
  const result: ValidationResult = {
    file: fileName,
    valid: true,
    errors: [],
    warnings: [],
    stats: { size: 0 },
  };

  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      result.valid = false;
      result.errors.push("文件不存在");
      return result;
    }

    // 获取文件大小
    const stats = fs.statSync(filePath);
    result.stats.size = stats.size;

    // 检查文件大小
    const config = validationConfig[fileName];
    if (config && stats.size < config.minSize) {
      result.warnings.push(
        `文件大小 (${stats.size} bytes) 小于预期最小值 (${config.minSize} bytes)`
      );
    }

    // 读取和解析 JSON
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.trim()) {
      result.valid = false;
      result.errors.push("文件为空");
      return result;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(content);
    } catch (parseError) {
      result.valid = false;
      result.errors.push(`JSON 解析失败: ${parseError.message}`);
      return result;
    }

    // 验证数据结构
    if (config) {
      // 检查是否应该是数组
      if (config.isArray && !Array.isArray(jsonData)) {
        result.valid = false;
        result.errors.push("期望数据为数组格式");
        return result;
      }

      // 检查必需的键
      if (!config.isArray && config.requiredKeys) {
        for (const key of config.requiredKeys) {
          if (!(key in jsonData)) {
            result.valid = false;
            result.errors.push(`缺少必需的键: ${key}`);
          }
        }
      }

      // 统计记录数量
      if (config.isArray) {
        result.stats.records = jsonData.length;
      } else if (jsonData.data && Array.isArray(jsonData.data)) {
        result.stats.records = jsonData.data.length;
      } else if (
        jsonData.MovesTbl?.Moves?.Move &&
        Array.isArray(jsonData.MovesTbl.Moves.Move)
      ) {
        result.stats.records = jsonData.MovesTbl.Moves.Move.length;
      } else if (
        jsonData.AchievementRules?.type &&
        Array.isArray(jsonData.AchievementRules.type)
      ) {
        result.stats.records = jsonData.AchievementRules.type.length;
      }
    }

    console.log(
      `✅ ${fileName}: 验证通过 (${result.stats.size} bytes${
        result.stats.records ? `, ${result.stats.records} 条记录` : ""
      })`
    );
  } catch (error) {
    result.valid = false;
    result.errors.push(`验证过程中发生错误: ${error.message}`);
  }

  return result;
}

function main() {
  console.log("🔍 开始验证 JSON 文件...\n");

  if (!fs.existsSync(jsonDir)) {
    console.error("❌ JSON 目录不存在:", jsonDir);
    process.exit(1);
  }

  const results: ValidationResult[] = [];
  let allValid = true;

  // 验证预期的文件
  for (const fileName of expectedFiles) {
    const filePath = path.join(jsonDir, fileName);
    const result = validateJsonFile(filePath);
    results.push(result);

    if (!result.valid) {
      allValid = false;
      console.error(`❌ ${fileName}:`);
      result.errors.forEach((error) => console.error(`   - ${error}`));
    }

    if (result.warnings.length > 0) {
      console.warn(`⚠️  ${fileName}:`);
      result.warnings.forEach((warning) => console.warn(`   - ${warning}`));
    }
  }

  // 检查是否有额外的 JSON 文件
  const actualFiles = fs
    .readdirSync(jsonDir)
    .filter((f) => f.endsWith(".json"));
  const extraFiles = actualFiles.filter((f) => !expectedFiles.includes(f));

  if (extraFiles.length > 0) {
    console.log(`\n📋 发现额外的 JSON 文件: ${extraFiles.join(", ")}`);

    for (const fileName of extraFiles) {
      const filePath = path.join(jsonDir, fileName);
      const result = validateJsonFile(filePath);
      results.push(result);
    }
  }

  // 输出统计信息
  console.log("\n📊 验证统计:");
  console.log(`   总文件数: ${results.length}`);
  console.log(`   有效文件: ${results.filter((r) => r.valid).length}`);
  console.log(`   无效文件: ${results.filter((r) => !r.valid).length}`);
  console.log(
    `   警告文件: ${results.filter((r) => r.warnings.length > 0).length}`
  );

  const totalSize = results.reduce((sum, r) => sum + r.stats.size, 0);
  const totalRecords = results.reduce(
    (sum, r) => sum + (r.stats.records || 0),
    0
  );

  console.log(`   总文件大小: ${(totalSize / 1024).toFixed(2)} KB`);
  if (totalRecords > 0) {
    console.log(`   总记录数: ${totalRecords}`);
  }

  if (allValid) {
    console.log("\n✅ 所有 JSON 文件验证通过！");
    process.exit(0);
  } else {
    console.log("\n❌ 部分 JSON 文件验证失败！");
    process.exit(1);
  }
}

main();

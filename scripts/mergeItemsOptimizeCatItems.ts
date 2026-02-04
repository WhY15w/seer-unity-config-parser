import fs from "fs";
import path from "path";

const jsonDir = "./json";

interface ClothItem {
  Name: string;
  type: string;
  actionDir?: number;
  Bean: number;
  catID: number;
  Hide: number;
  ID: number;
  isSpecial: number;
  LifeTime?: number;
  Max: number;
  Price?: number;
  purpose: number;
  RepairPrice?: number;
  Sort: number;
  speed: number;
  UseMax: number;
  VipOnly: number;
  wd: number;
  [key: string]: any;
}

interface ItemsData {
  items: ClothItem[];
}

async function mergeItemsOptimizeCatItems() {
  try {
    const files = fs.readdirSync(jsonDir);

    const itemsFiles = files.filter(
      (file) =>
        file.startsWith("itemsOptimizeCatItems") && file.endsWith(".json")
    );

    console.log(
      `找到 ${itemsFiles.length} 个itemsOptimizeCatItems文件:`,
      itemsFiles
    );

    const mergedItems: ClothItem[] = [];

    for (const file of itemsFiles) {
      const filePath = path.join(jsonDir, file);
      console.log(`正在处理文件: ${file}`);

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const data: ItemsData = JSON.parse(fileContent);

      if (data.items && Array.isArray(data.items)) {
        console.log(`从 ${file} 中读取到 ${data.items.length} 个物品`);
        mergedItems.push(...data.items);
      } else {
        console.warn(`警告: ${file} 文件格式不正确，缺少items数组`);
      }
    }

    mergedItems.sort((a, b) => a.ID - b.ID);

    const mergedData: ItemsData = {
      items: mergedItems,
    };

    const outputPath = path.join(jsonDir, "clothItems.json");
    fs.writeFileSync(outputPath, JSON.stringify(mergedData, null, 2), "utf-8");

    console.log(`✓ 成功合并 ${mergedItems.length} 个物品到 ${outputPath}`);
    console.log(`合并完成！文件保存在: ${outputPath}`);
  } catch (error) {
    console.error("合并过程中出现错误:", error);
    process.exit(1);
  }
}

mergeItemsOptimizeCatItems();

import { sendTextMessage } from "../utils/feishu";

import { parseMonstersConfig } from "../bytes2json/monsters";
import { parseBuffConfig } from "../bytes2json/buff";
import { parseAchievements } from "../bytes2json/achievement";
import { parseMovesConfig } from "../bytes2json/moves";
import { parseSuitConfig } from "../bytes2json/suit";
import { parseItemsOptimizeCatItems1Config } from "../bytes2json/itemsOptimizeCatItems1";
import { parseItemsOptimizeCatItems13Config } from "../bytes2json/itemsOptimizeCatItems13";
import { parseProfilephotoConfig } from "../bytes2json/profilePhoto";
import { parseEquipConfig } from "../bytes2json/equip";
import { parseSkillEffectConfig } from "../bytes2json/skillEffect";
import { parseEffectIconConfig } from "../bytes2json/effectIcon";
import { parseSkillTypesConfig } from "../bytes2json/skillTypes";
import { parseEffectInfoConfig } from "../bytes2json/effectInfo";
import { parseMintmarkConfig } from "../bytes2json/mintmark";
import { parseNewSuperDesignConfig } from "../bytes2json/newSuperDesign";
import { parsePetSkinConfig } from "../bytes2json/petSkin";
import { parsePetbookConfig } from "../bytes2json/petBook";
import { parseTypesRelationConfig } from "../bytes2json/typesRelation";
import { parseMintmarkElevareConfig } from "../bytes2json/mintmarkElevare";
import { parseLanternQuestionConfig } from "../bytes2json/lanternQuestion";
import { parsePeakBattleMonsConfig } from "../bytes2json/peakBattleMons";
import { parsePvpBanConfig } from "../bytes2json/pvpBan";
import { parsePvpBanExpertConfig } from "../bytes2json/pvpBanExpert";
import { parseEffectDesConfig } from "../bytes2json/effectDes";

const failures: { name: string; error: string }[] = [];

function safeRun(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name} 解析成功`);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`✗ ${name} 解析失败:`, error);
    failures.push({ name, error: errorMsg });
  }
}

safeRun("monsters", () =>
  parseMonstersConfig("./ConfigPackage/export/monsters.bytes")
);
safeRun("buff", () => parseBuffConfig("./ConfigPackage/export/buff.bytes"));
safeRun("achievements", () =>
  parseAchievements("./ConfigPackage/export/achievements.bytes")
);
safeRun("moves", () => parseMovesConfig("./ConfigPackage/export/moves.bytes"));
safeRun("suit", () => parseSuitConfig("./ConfigPackage/export/suit.bytes"));
safeRun("itemsOptimizeCatItems1", () =>
  parseItemsOptimizeCatItems1Config(
    "./ConfigPackage/export/itemsOptimizeCatItems1.bytes"
  )
);
safeRun("itemsOptimizeCatItems13", () =>
  parseItemsOptimizeCatItems13Config(
    "./ConfigPackage/export/itemsOptimizeCatItems13.bytes"
  )
);
safeRun("profilephoto", () =>
  parseProfilephotoConfig("./ConfigPackage/export/profilephoto.bytes")
);
safeRun("equip", () => parseEquipConfig("./ConfigPackage/export/equip.bytes"));
safeRun("skillEffect", () =>
  parseSkillEffectConfig("./ConfigPackage/export/skill_effect.bytes")
);
safeRun("effectIcon", () =>
  parseEffectIconConfig("./ConfigPackage/export/effectIcon.bytes")
);
safeRun("skillTypes", () =>
  parseSkillTypesConfig("./ConfigPackage/export/skillTypes.bytes")
);
safeRun("effectInfo", () =>
  parseEffectInfoConfig("./ConfigPackage/export/effectInfo.bytes")
);
safeRun("mintmark", () =>
  parseMintmarkConfig("./ConfigPackage/export/mintmark.bytes")
);
safeRun("newSuperDesign", () => {
  parseNewSuperDesignConfig("./ConfigPackage/export/new_super_design.bytes");
});
safeRun("petSkin", () => {
  parsePetSkinConfig("./ConfigPackage/export/pet_skin.bytes");
});
safeRun("petBook", () => {
  parsePetbookConfig("./ConfigPackage/export/petbook.bytes");
});
safeRun("typesRelation", () => {
  parseTypesRelationConfig("./ConfigPackage/export/typesRelation.bytes");
});
safeRun("mintmarkElevare", () => {
  parseMintmarkElevareConfig("./ConfigPackage/export/mintmarkElevare.bytes");
});
safeRun("lanternQuestion", () => {
  parseLanternQuestionConfig("./ConfigPackage/export/lanternQuestion.bytes");
});
safeRun("peakBattleMons", () => {
  parsePeakBattleMonsConfig("./ConfigPackage/export/peak_battle_mons.bytes");
});
safeRun("pvpBan", () => {
  parsePvpBanConfig("./ConfigPackage/export/pvp_ban.bytes");
});
safeRun("pvpBanExpert", () => {
  parsePvpBanExpertConfig("./ConfigPackage/export/pvp_ban_expert.bytes");
});
safeRun("effectDes", () => {
  parseEffectDesConfig("./ConfigPackage/export/effectDes.bytes");
});

async function sendFeishuAlert() {
  if (failures.length > 0) {
    const message = `🚨 配置解析告警\n\n共 ${
      failures.length
    } 个配置解析失败:\n\n${failures
      .map((f, i) => `${i + 1}. ${f.name}\n   错误: ${f.error}`)
      .join("\n\n")}`;
    await sendTextMessage(message);
    console.log("\n📢 已发送飞书告警");
  } else {
    console.log("\n✅ 所有配置解析成功，无需告警");
  }
}

sendFeishuAlert();

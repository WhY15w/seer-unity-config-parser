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
import { parseAwakenDetail } from "../bytes2json/awakendetail";
import { parsePvpVoteConfig } from "../bytes2json/pvpVote";
import { parsePvpTaskConfig } from "../bytes2json/pvpTask";
import { parseLanguageConfig } from "../bytes2json/language";
import { parseAutocardBuffConfig } from "../bytes2json/autocardBuff";
import { parseAutocardConditionConfig } from "../bytes2json/autocardCondition";
import { parseAutocardContentConfig } from "../bytes2json/autocardContent";
import { parseAutocardEffectConfig } from "../bytes2json/autocardEffect";
import { parseAutocardEffectIconDesConfig } from "../bytes2json/autocardEffectIconDes";
import { parseAutocardNatureConfig } from "../bytes2json/autocardNature";
import { parseAutocardPlayerConfig } from "../bytes2json/autocardPlayer";
import { parseAutoCardRecomConfig } from "../bytes2json/autoCardRecom";
import { parseAutocardRoleConfig } from "../bytes2json/autocardRole";
import { parseAutocardSkinConfig } from "../bytes2json/autocardSkin";
import { parseNewSeConfig } from "../bytes2json/newSe";
import { parsePetFriendsConfig } from "../bytes2json/petFriends";
import { parsePvpAchieveConfig } from "../bytes2json/pvpAchieve";
import { parseBottlebonusConfig } from "../bytes2json/bottlebonus";
import { parseBossInfoConfig } from "../bytes2json/bossInfo";
import { parseBoxordinaryConfig } from "../bytes2json/boxordinary";
import { parseBraveGuideConfig } from "../bytes2json/braveGuide";
import { parseBraveLvConfig } from "../bytes2json/braveLv";
import { parseBraveTaskConfig } from "../bytes2json/braveTask";
import { parseBraveTowerConfig } from "../bytes2json/braveTower";
import { parseChannelConfig } from "../bytes2json/channel";
import { parseChapterConfig } from "../bytes2json/chapter";
import { parseDailytaskConfig } from "../bytes2json/dailytask";
import { parseBravechalltaskConfig } from "../bytes2json/bravechalltask";
import { parseBravecommtaskConfig } from "../bytes2json/bravecommtask";
import { parseBtlConditionConfig } from "../bytes2json/btlCondition";
import { parseDailytaskGiftConfig } from "../bytes2json/dailytaskGift";
import { parseDiamonBoxConfig } from "../bytes2json/diamonBox";
import { parseDiamonTaskConfig } from "../bytes2json/diamonTask";
import { parseDrinkcheckpointConfig } from "../bytes2json/drinkcheckpoint";
import { parseDrinkrecipeConfig } from "../bytes2json/drinkrecipe";
import { parseDungeonEnterConfig } from "../bytes2json/dungeonEnter";
import { parseEmojiConfig } from "../bytes2json/emoji";
import { parseEventScheduleConfig } from "../bytes2json/eventSchedule";
import { parseExchangeCltConfig } from "../bytes2json/exchangeClt";
import { parseExchangeRestrictConfig } from "../bytes2json/exchangeRestrict";
import { parseExplorationRewardConfig } from "../bytes2json/explorationReward";
import { parseExpressJumpConfig } from "../bytes2json/expressJump";
import { parseExpTowerConfig } from "../bytes2json/expTower";
import { parseFrameInfoConfig } from "../bytes2json/frameInfo";
import { parseFurnitureConfig } from "../bytes2json/furniture";
import { parseGainWayConfig } from "../bytes2json/gainWay";
import { parseGlobalNumberConfig } from "../bytes2json/globalNumber";
import { parseGlobalStrConfig } from "../bytes2json/globalStr";
import { parseGuidePetRecommendConfig } from "../bytes2json/guidePetRecommend";
import { parseH512thBoxConfig } from "../bytes2json/h512thBox";
import { parseH512thTaskConfig } from "../bytes2json/h512thTask";
import { parseHandbookBanConfig } from "../bytes2json/handbookBan";
import { parseHelperConfig } from "../bytes2json/helper";
import { parseHelpTipsConfig } from "../bytes2json/helpTips";
import { parseJumptargetConfig } from "../bytes2json/jumptarget";
import { parseLevelConditionConfig } from "../bytes2json/levelCondition";
import { parseLearningpowerTowerConfig } from "../bytes2json/learningpowerTower";
import { parseLimitUseItemInfoConfig } from "../bytes2json/limitUseItemInfo";
import { parseLoginGiftConfig } from "../bytes2json/loginGift";
import { parseMallrefreshConfig } from "../bytes2json/mallrefresh";
import { parseMapdropConfig } from "../bytes2json/mapdrop";
import { parseMatchGameConfig } from "../bytes2json/matchGame";
import { parseMedaltaskConfig } from "../bytes2json/medaltask";
import { parseMiniGameConfig } from "../bytes2json/miniGame";
import { parseMonsterVideosConfig } from "../bytes2json/monsterVideos";
import { parseMonthpetConfig } from "../bytes2json/monthpet";
import { parseMountTailConfig } from "../bytes2json/mountTail";
import { parseNewBraveChallengeConfig } from "../bytes2json/newBraveChallenge";
import { parseNewBraveLvConfig } from "../bytes2json/newBraveLv";
import { parseNewBraveTaskConfig } from "../bytes2json/newBraveTask";
import { parseNewMonsterLevelConfig } from "../bytes2json/newMonsterLevel";
import { parseNewMonsterLevelBisaifuConfig } from "../bytes2json/newMonsterLevelBisaifu";
import { parseNewMonsterLevelTempConfig } from "../bytes2json/newMonsterLevelTemp";
import { parseNewSeerWelfareConfig } from "../bytes2json/newSeerWelfare";
import { parseNewSetGameConfig } from "../bytes2json/newSetGame";
import { parseNpcConfig } from "../bytes2json/npc";
import { parsePopupConfig } from "../bytes2json/popup";
import { parsePreferentialBestConfig } from "../bytes2json/preferentialBest";
import { parsePrivateCostDiamondRewardConfig } from "../bytes2json/privateCostDiamondReward";
import { parsePrivateShopConfig } from "../bytes2json/privateShop";
import { parsePrivateSignConfig } from "../bytes2json/privateSign";
import { parsePrivateTrainExtraRewardConfig } from "../bytes2json/privateTrainExtraReward";
import { parsePrivateTrainTaskConfig } from "../bytes2json/privateTrainTask";
import { parsePveBossExperienceTrainingConfig } from "../bytes2json/pveBossExperienceTraining";
import { parsePveBossLearningTrainingConfig } from "../bytes2json/pveBossLearningTraining";
import { parsePveEnterConfig } from "../bytes2json/pveEnter";
import { parsePvpBossConfigConfig } from "../bytes2json/pvpBossConfig";
import { parsePvpExpertSeasonrankConfig } from "../bytes2json/pvpExpertSeasonrank";
import { parsePvpHonorpantheonConfig } from "../bytes2json/pvpHonorpantheon";
import { parsePvpMonsterConfigConfig } from "../bytes2json/pvpMonsterConfig";
import { parsePvpQuizshopConfig } from "../bytes2json/pvpQuizshop";
import { parsePvpQuiztaskConfig } from "../bytes2json/pvpQuiztask";
import { parsePvpRaceConfig } from "../bytes2json/pvpRace";
import { parsePvpRewardConfig } from "../bytes2json/pvpReward";
import { parsePvpShopConfig } from "../bytes2json/pvpShop";
import { parsePvpShopBisaifuConfig } from "../bytes2json/pvpShopBisaifu";

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
  parseMonstersConfig("./ConfigPackage/export/monsters.bytes"),
);
safeRun("buff", () => parseBuffConfig("./ConfigPackage/export/buff.bytes"));
safeRun("achievements", () =>
  parseAchievements("./ConfigPackage/export/achievements.bytes"),
);
safeRun("moves", () => parseMovesConfig("./ConfigPackage/export/moves.bytes"));
safeRun("suit", () => parseSuitConfig("./ConfigPackage/export/suit.bytes"));
safeRun("itemsOptimizeCatItems1", () =>
  parseItemsOptimizeCatItems1Config(
    "./ConfigPackage/export/itemsOptimizeCatItems1.bytes",
  ),
);
safeRun("itemsOptimizeCatItems13", () =>
  parseItemsOptimizeCatItems13Config(
    "./ConfigPackage/export/itemsOptimizeCatItems13.bytes",
  ),
);
safeRun("profilephoto", () =>
  parseProfilephotoConfig("./ConfigPackage/export/profilephoto.bytes"),
);
safeRun("equip", () => parseEquipConfig("./ConfigPackage/export/equip.bytes"));
safeRun("skillEffect", () =>
  parseSkillEffectConfig("./ConfigPackage/export/skill_effect.bytes"),
);
safeRun("effectIcon", () =>
  parseEffectIconConfig("./ConfigPackage/export/effectIcon.bytes"),
);
safeRun("skillTypes", () =>
  parseSkillTypesConfig("./ConfigPackage/export/skillTypes.bytes"),
);
safeRun("effectInfo", () =>
  parseEffectInfoConfig("./ConfigPackage/export/effectInfo.bytes"),
);
safeRun("mintmark", () =>
  parseMintmarkConfig("./ConfigPackage/export/mintmark.bytes"),
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
safeRun("awakendetail", () => {
  parseAwakenDetail("./ConfigPackage/export/awakendetail.bytes");
});
safeRun("pvpVote", () => {
  parsePvpVoteConfig("./ConfigPackage/export/pvp_vote.bytes");
});
safeRun("pvpTask", () => {
  parsePvpTaskConfig("./ConfigPackage/export/pvp_task.bytes");
});
safeRun("language", () => {
  parseLanguageConfig("./ConfigPackage/export/language.bytes");
});
safeRun("autocardBuff", () => {
  parseAutocardBuffConfig("./ConfigPackage/export/autocardBuff.bytes");
});
safeRun("autocardCondition", () => {
  parseAutocardConditionConfig(
    "./ConfigPackage/export/autocardCondition.bytes",
  );
});
safeRun("autocardContent", () => {
  parseAutocardContentConfig("./ConfigPackage/export/autocardContent.bytes");
});
safeRun("autocardEffect", () => {
  parseAutocardEffectConfig("./ConfigPackage/export/autocardEffect.bytes");
});
safeRun("autocardEffectIconDes", () => {
  parseAutocardEffectIconDesConfig(
    "./ConfigPackage/export/autocardEffectIconDes.bytes",
  );
});
safeRun("autocardNature", () => {
  parseAutocardNatureConfig("./ConfigPackage/export/autocardNature.bytes");
});
safeRun("autocardPlayer", () => {
  parseAutocardPlayerConfig("./ConfigPackage/export/autocardPlayer.bytes");
});
safeRun("autoCardRecom", () => {
  parseAutoCardRecomConfig("./ConfigPackage/export/autoCardRecom.bytes");
});
safeRun("autocardRole", () => {
  parseAutocardRoleConfig("./ConfigPackage/export/autocardRole.bytes");
});
safeRun("autocardSkin", () => {
  parseAutocardSkinConfig("./ConfigPackage/export/autocardSkin.bytes");
});
safeRun("new_se", () => {
  parseNewSeConfig("./ConfigPackage/export/new_se.bytes");
});
safeRun("pet_friends", () => {
  parsePetFriendsConfig("./ConfigPackage/export/pet_friends.bytes");
});
safeRun("pvp_achieve", () => {
  parsePvpAchieveConfig("./ConfigPackage/export/pvp_achieve.bytes");
});
safeRun("bottlebonus", () =>
  parseBottlebonusConfig("./ConfigPackage/export/bottlebonus.bytes"),
);
safeRun("bossInfo", () =>
  parseBossInfoConfig("./ConfigPackage/export/bossInfo.bytes"),
);
safeRun("boxordinary", () =>
  parseBoxordinaryConfig("./ConfigPackage/export/boxordinary.bytes"),
);
safeRun("brave_guide", () =>
  parseBraveGuideConfig("./ConfigPackage/export/brave_guide.bytes"),
);
safeRun("brave_lv", () =>
  parseBraveLvConfig("./ConfigPackage/export/brave_lv.bytes"),
);
safeRun("brave_task", () =>
  parseBraveTaskConfig("./ConfigPackage/export/brave_task.bytes"),
);
safeRun("brave_tower", () =>
  parseBraveTowerConfig("./ConfigPackage/export/brave_tower.bytes"),
);
safeRun("channel", () =>
  parseChannelConfig("./ConfigPackage/export/channel.bytes"),
);
safeRun("chapter", () =>
  parseChapterConfig("./ConfigPackage/export/chapter.bytes"),
);
safeRun("dailytask", () =>
  parseDailytaskConfig("./ConfigPackage/export/dailytask.bytes"),
);
safeRun("Bravechalltask", () =>
  parseBravechalltaskConfig("./ConfigPackage/export/Bravechalltask.bytes"),
);
safeRun("Bravecommtask", () =>
  parseBravecommtaskConfig("./ConfigPackage/export/Bravecommtask.bytes"),
);
safeRun("btl_condition", () =>
  parseBtlConditionConfig("./ConfigPackage/export/btl_condition.bytes"),
);
safeRun("dailytask_gift", () =>
  parseDailytaskGiftConfig("./ConfigPackage/export/dailytask_gift.bytes"),
);
safeRun("diamon_box", () =>
  parseDiamonBoxConfig("./ConfigPackage/export/diamon_box.bytes"),
);
safeRun("diamon_task", () =>
  parseDiamonTaskConfig("./ConfigPackage/export/diamon_task.bytes"),
);
safeRun("drinkcheckpoint", () =>
  parseDrinkcheckpointConfig("./ConfigPackage/export/drinkcheckpoint.bytes"),
);
safeRun("drinkrecipe", () =>
  parseDrinkrecipeConfig("./ConfigPackage/export/drinkrecipe.bytes"),
);
safeRun("dungeon_enter", () =>
  parseDungeonEnterConfig("./ConfigPackage/export/dungeon_enter.bytes"),
);
safeRun("emoji", () =>
  parseEmojiConfig("./ConfigPackage/export/emoji.bytes"),
);
safeRun("eventSchedule", () =>
  parseEventScheduleConfig("./ConfigPackage/export/eventSchedule.bytes"),
);
safeRun("exchange_clt", () =>
  parseExchangeCltConfig("./ConfigPackage/export/exchange_clt.bytes"),
);
safeRun("exchangeRestrict", () =>
  parseExchangeRestrictConfig("./ConfigPackage/export/exchangeRestrict.bytes"),
);
safeRun("ExplorationReward", () =>
  parseExplorationRewardConfig("./ConfigPackage/export/ExplorationReward.bytes"),
);
safeRun("express_jump", () =>
  parseExpressJumpConfig("./ConfigPackage/export/express_jump.bytes"),
);
safeRun("exp_tower", () =>
  parseExpTowerConfig("./ConfigPackage/export/exp_tower.bytes"),
);
safeRun("FrameInfo", () =>
  parseFrameInfoConfig("./ConfigPackage/export/FrameInfo.bytes"),
);
safeRun("furniture", () =>
  parseFurnitureConfig("./ConfigPackage/export/furniture.bytes"),
);
safeRun("gainWay", () =>
  parseGainWayConfig("./ConfigPackage/export/gainWay.bytes"),
);
safeRun("globalNumber", () =>
  parseGlobalNumberConfig("./ConfigPackage/export/globalNumber.bytes"),
);
safeRun("globalStr", () =>
  parseGlobalStrConfig("./ConfigPackage/export/globalStr.bytes"),
);
safeRun("guidePetRecommend", () =>
  parseGuidePetRecommendConfig("./ConfigPackage/export/guidePetRecommend.bytes"),
);
safeRun("h5_12th_box", () =>
  parseH512thBoxConfig("./ConfigPackage/export/h5_12th_box.bytes"),
);
safeRun("h5_12th_task", () =>
  parseH512thTaskConfig("./ConfigPackage/export/h5_12th_task.bytes"),
);
safeRun("handbook_ban", () =>
  parseHandbookBanConfig("./ConfigPackage/export/handbook_ban.bytes"),
);
safeRun("helper", () =>
  parseHelperConfig("./ConfigPackage/export/helper.bytes"),
);
safeRun("help_tips", () =>
  parseHelpTipsConfig("./ConfigPackage/export/help_tips.bytes"),
);
safeRun("jumptarget", () =>
  parseJumptargetConfig("./ConfigPackage/export/jumptarget.bytes"),
);
safeRun("LevelCondition", () =>
  parseLevelConditionConfig("./ConfigPackage/export/LevelCondition.bytes"),
);
safeRun("learningpower_tower", () =>
  parseLearningpowerTowerConfig("./ConfigPackage/export/learningpower_tower.bytes"),
);
safeRun("LimitUseItemInfo", () =>
  parseLimitUseItemInfoConfig("./ConfigPackage/export/LimitUseItemInfo.bytes"),
);
safeRun("LoginGift", () =>
  parseLoginGiftConfig("./ConfigPackage/export/LoginGift.bytes"),
);
safeRun("mallrefresh", () =>
  parseMallrefreshConfig("./ConfigPackage/export/mallrefresh.bytes"),
);
safeRun("mapdrop", () =>
  parseMapdropConfig("./ConfigPackage/export/mapdrop.bytes"),
);
safeRun("match_game", () =>
  parseMatchGameConfig("./ConfigPackage/export/match_game.bytes"),
);
safeRun("medaltask", () =>
  parseMedaltaskConfig("./ConfigPackage/export/medaltask.bytes"),
);
safeRun("mini_game", () =>
  parseMiniGameConfig("./ConfigPackage/export/mini_game.bytes"),
);
safeRun("monsterVideos", () =>
  parseMonsterVideosConfig("./ConfigPackage/export/monsterVideos.bytes"),
);
safeRun("monthpet", () =>
  parseMonthpetConfig("./ConfigPackage/export/monthpet.bytes"),
);
safeRun("mount_tail", () =>
  parseMountTailConfig("./ConfigPackage/export/mount_tail.bytes"),
);
safeRun("newBraveChallenge", () =>
  parseNewBraveChallengeConfig("./ConfigPackage/export/newBraveChallenge.bytes"),
);
safeRun("newBraveLv", () =>
  parseNewBraveLvConfig("./ConfigPackage/export/newBraveLv.bytes"),
);
safeRun("newBraveTask", () =>
  parseNewBraveTaskConfig("./ConfigPackage/export/newBraveTask.bytes"),
);
safeRun("new_monster_level", () =>
  parseNewMonsterLevelConfig("./ConfigPackage/export/new_monster_level.bytes"),
);
safeRun("new_monster_level_bisaifu", () =>
  parseNewMonsterLevelBisaifuConfig("./ConfigPackage/export/new_monster_level_bisaifu.bytes"),
);
safeRun("new_monster_level_temp", () =>
  parseNewMonsterLevelTempConfig("./ConfigPackage/export/new_monster_level_temp.bytes"),
);
safeRun("NewSeerWelfare", () =>
  parseNewSeerWelfareConfig("./ConfigPackage/export/NewSeerWelfare.bytes"),
);
safeRun("newSetGame", () =>
  parseNewSetGameConfig("./ConfigPackage/export/newSetGame.bytes"),
);
safeRun("npc", () =>
  parseNpcConfig("./ConfigPackage/export/npc.bytes"),
);
safeRun("Popup", () =>
  parsePopupConfig("./ConfigPackage/export/Popup.bytes"),
);
safeRun("PreferentialBest", () =>
  parsePreferentialBestConfig("./ConfigPackage/export/PreferentialBest.bytes"),
);
safeRun("privateCostDiamondReward", () =>
  parsePrivateCostDiamondRewardConfig("./ConfigPackage/export/privateCostDiamondReward.bytes"),
);
safeRun("privateShop", () =>
  parsePrivateShopConfig("./ConfigPackage/export/privateShop.bytes"),
);
safeRun("privateSign", () =>
  parsePrivateSignConfig("./ConfigPackage/export/privateSign.bytes"),
);
safeRun("privateTrainExtraReward", () =>
  parsePrivateTrainExtraRewardConfig("./ConfigPackage/export/privateTrainExtraReward.bytes"),
);
safeRun("privateTrainTask", () =>
  parsePrivateTrainTaskConfig("./ConfigPackage/export/privateTrainTask.bytes"),
);
// PveBossBraveTower.bytes is already JSON (pre-parsed), skip binary parsing
safeRun("PveBossExperienceTraining", () =>
  parsePveBossExperienceTrainingConfig("./ConfigPackage/export/PveBossExperienceTraining.bytes"),
);
safeRun("PveBossLearningTraining", () =>
  parsePveBossLearningTrainingConfig("./ConfigPackage/export/PveBossLearningTraining.bytes"),
);
safeRun("pveEnter", () =>
  parsePveEnterConfig("./ConfigPackage/export/pveEnter.bytes"),
);
safeRun("pvp_BossConfig", () =>
  parsePvpBossConfigConfig("./ConfigPackage/export/pvp_BossConfig.bytes"),
);
safeRun("pvp_expert_seasonrank", () =>
  parsePvpExpertSeasonrankConfig("./ConfigPackage/export/pvp_expert_seasonrank.bytes"),
);
safeRun("pvp_honorpantheon", () =>
  parsePvpHonorpantheonConfig("./ConfigPackage/export/pvp_honorpantheon.bytes"),
);
safeRun("pvp_MonsterConfig", () =>
  parsePvpMonsterConfigConfig("./ConfigPackage/export/pvp_MonsterConfig.bytes"),
);
safeRun("pvp_quizshop", () =>
  parsePvpQuizshopConfig("./ConfigPackage/export/pvp_quizshop.bytes"),
);
safeRun("pvp_quiztask", () =>
  parsePvpQuiztaskConfig("./ConfigPackage/export/pvp_quiztask.bytes"),
);
safeRun("pvp_race", () =>
  parsePvpRaceConfig("./ConfigPackage/export/pvp_race.bytes"),
);
safeRun("pvp_reward", () =>
  parsePvpRewardConfig("./ConfigPackage/export/pvp_reward.bytes"),
);
safeRun("pvp_shop", () =>
  parsePvpShopConfig("./ConfigPackage/export/pvp_shop.bytes"),
);
safeRun("pvp_shop_bisaifu", () =>
  parsePvpShopBisaifuConfig("./ConfigPackage/export/pvp_shop_bisaifu.bytes"),
);

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

import Downloader from "./updater/Downloader";
import YooVersionManager from "./updater/YooVersionManager";
import Updater from "./updater/Updater";

async function runUpdate() {
  const downloader = new Downloader({
    headers: {
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0.1) AppleWebKit/537.36 Chrome/55 Mobile",
      referer: "https://newseer.61.com",
    },
  });

  const versionManager = new YooVersionManager(
    "ConfigPackage",
    "https://newseer.61.com/Assets/StandaloneWindows64/ConfigPackage/",
    "./ConfigPackage/"
  );

  const updater = new Updater(
    "newseer.config",
    "seerUnity ConfigPackage Part",
    versionManager,
    downloader
  );

  const info = await updater.getVersionInfo();
  console.log(`当前本地版本: ${info.local}`);
  console.log(`远程版本: ${info.remote}`);

  await updater.update(20);
}

runUpdate().catch((e) => console.error("更新失败:", e));

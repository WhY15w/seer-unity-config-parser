import { readFileSync, writeFileSync } from "fs";
import { parseBuffConfig } from "../bytes2json/buff";
import path from "path";

const name = "buff";
const fileBuffer = readFileSync("./ConfigPackage/export/" + name + ".bytes");
const data = new Uint8Array(fileBuffer);

const rules = parseBuffConfig(data);

const savePath = "./json/";
writeFileSync(
  path.join(savePath, name + ".json"),
  JSON.stringify(rules, null, 2)
);

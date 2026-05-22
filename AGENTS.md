# seer-unity-config-parser

Hybrid TS+Python pipeline that downloads Unity config bundles from `https://newseer.61.com/`, extracts `.bytes` files via UnityPy, then converts each to JSON.

## Essential commands

| Command | What it does |
|---------|-------------|
| `pnpm start` | Full pipeline: update → export → main → mergeItemsOptimizeCatItems → validate → detect-changes |
| `pnpm run update` | Download latest config package to `ConfigPackage/` via `parser/index.ts` |
| `pnpm run export` | Extract `.bytes` files from Unity bundle (runs `parser/UnityFSParser.py`) |
| `pnpm run main` | Parse all ~170 `.bytes` → JSON via `main/index.ts` |
| `pnpm run dev` | `update` + `export` + `main` (no validation/change-detection) |
| `pnpm run validate` | Validate JSON outputs via `scripts/validate-json.ts` |
| `pnpm run detect-changes` | Compare hashes against cache at `cache/last-release-hashes.json` |

Always use `pnpm` (not npm). TypeScript is run via `tsx`, not `tsc`.

## Pipeline

1. **update** — `parser/index.ts` uses `YooVersionManager` to diff remote vs local version, downloads changed files with concurrency 20. Downloads land in `ConfigPackage/`.
2. **export** — `parser/UnityFSParser.py` (requires `pip install UnityPy`) reads the Unity bundle at `ConfigPackage/pgame_configs_bytes` and writes named `.bytes` files to `ConfigPackage/export/`.
3. **main** — `main/index.ts` iterates all ~170 parsers in `bytes2json/`, each wrapped in `safeRun()` so a single failure doesn't halt the batch. Failures are reported via Feishu webhook at end.
4. **mergeItemsOptimizeCatItems** — Merges `itemsOptimizeCatItems1.json` + `itemsOptimizeCatItems13.json` into one.
5. **validate** — Checks output JSON has expected keys and min size.
6. **detect-changes** — Compares SHA256 hashes of current vs cached `json/*.json`; prints diff.

## Adding a new parser

1. Create file in `bytes2json/` following the declarative `ConfigParserTemplate` pattern (see `buff.ts`).
2. Import and register it in `main/index.ts` with a `safeRun("name", () => parseXxx("./ConfigPackage/export/xxx.bytes"))` call.
3. Optionally add to the expected files list in `scripts/validate-json.ts`.

## Binary format conventions

- `BytesReader` defaults: **little-endian**, text length prefix = `Uint16`.
- Most files follow: `boolean (hasData) + int32 (count) + items[count]`.
- Use `ConfigParserTemplate.ts` schema helpers (`createSimpleListParser`, `parseBySchema`, `createConfigParser`) rather than writing raw reader calls.
- The declarative `FieldSchema` ([name, typeDef][]) order **must** match the binary field order exactly.

## CI

- GitHub Action runs weekly (Fri 12:00/14:00 CST) on `ubuntu-latest` with pnpm 9, Node 20, Python 3.11.
- `pnpm install --frozen-lockfile`, then `pip install -r requirements.txt`, then `pnpm start`.
- Auto-commits any changed JSON to the repo via `github-actions[bot]`.

## Environment

- `.env` file (gitignored) supplies `FEISHU_WEBHOOK_URL` and `FEISHU_SECRET` for failure alerts.
- Python dependency: `UnityPy>=1.10.0` (in `requirements.txt`).
- `ConfigPackage/`, `json/`, and `logs/` are gitignored.

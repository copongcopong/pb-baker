# pb-baker — PocketBase upgrade & test prompt

You are working in **pb-baker**: a Bun-based PocketBase starter that bundles TypeScript from `app/src/` into CJS JSVM hooks (`pb_hooks/`). The PocketBase binary is **not committed** — `app/scripts/init.ts` downloads a pinned release from GitHub and extracts it, then creates a superuser.

## Version pins (keep all in sync)

| Where | What |
|---|---|
| `app/scripts/init.ts` | `const version = \`X.Y.Z\`;` — the downloaded PB binary |
| `README.md` | 4 `vX.Y.Z` references (header, "designed for", release-notes link, first-run note) |
| `package.json` | `pocketbase-jsvm` (JSVM TypeScript types; versioned independently of PB) |

## Task A — update PocketBase to the latest

1. Find latest versions:
   - PB binary: `curl -s https://api.github.com/repos/pocketbase/pocketbase/releases/latest | jq -r .tag_name` (strip leading `v`)
   - jsvm types: `curl -s https://registry.npmjs.org/pocketbase-jsvm | jq -r '.["dist-tags"].latest'`
2. `git fetch`, then cut the branch off **`origin/main`** — local `main` is often stale, and previous upgrade branches may be unmerged:
   `git checkout -b chore/pocketbase-X.Y.Z origin/main`
3. Read the changelog between current and target versions (`https://raw.githubusercontent.com/pocketbase/pocketbase/master/CHANGELOG.md`). If any JSVM/hooks breaking changes affect code in `app/src/`, update the hooks accordingly.
4. Apply edits:
   - `app/scripts/init.ts` — version → target
   - `README.md` — replace **all** `vX.Y.Z` occurrences
   - `package.json` — bump `pocketbase-jsvm` only if npm latest differs from the pin
5. Verify release assets exist for every platform `init.ts` downloads (note: linux `x64` → `amd64`):
   `pocketbase_X.Y.Z_darwin_arm64.zip`, `pocketbase_X.Y.Z_linux_amd64.zip`, `pocketbase_X.Y.Z_windows_amd64.zip`
6. Commit `chore: upgrade PocketBase to X.Y.Z`, push, open PR to `main`. After merge: `git fetch && git merge --ff-only origin/main`. An unmerged older upgrade branch is safe to delete once its bump is fully subsumed.

## Task B — test

1. `bun install` — expect "no changes" unless `package.json` changed.
2. `bun run build` — must end with `build complete!` and zero TS errors. Outputs to `pb_hooks/` (gitignored).
3. Runtime smoke test (artifacts `pocketbase`, `pb_data/`, `_pb.zip` are all gitignored):
   - `bun run initialize!` — downloads the pinned binary and creates a superuser (prints creds). If `wget` is unavailable (macOS default), substitute `curl -L -o _pb.zip <url>` and `unzip _pb.zip`.
   - Start the server: `./pocketbase serve --http 127.0.0.1:8888`
   - Startup logs must show every hook loaded: `loaded > app:hooks:cmd`, `:bootstrap`, `:cron`, `:routes`, `:middlewares`, `:event-hooks`
   - `curl -s http://127.0.0.1:8888/api/health` → HTTP 200
   - Stop the server; delete `_pb.zip` if left behind.
4. Report: target version, changelog verdict (breaking/none), build result, smoke-test result.

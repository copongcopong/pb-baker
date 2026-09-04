# PocketBase Baker

PocketBase (v0.40.2, Extend with JavaScript) project initializer in Bun

- designed for PocketBase v0.40.2 and Bundler by Bun (https://bun.sh)
  - see Release Notes: https://github.com/pocketbase/pocketbase/releases/tag/v0.40.2
  - See Docs: https://pocketbase.io/docs/
  - see https://pocketbase.io/docs/use-as-framework/
  - https://pocketbase.io/docs/js-overview/
  - https://pocketbase.io/jsvm-rc/

## Stack Structure

- `/app/**` contains TS files that will be loaded as JSVM libs and hooks (CJS bundled)
- `/app/app.build.ts` - build script for pb_hooks
- `/app/lib.build.ts` - build script for reusable JSVM libs inside pb_hooks 
    ```
    const lib  = require(`${__hooks}/app/lib`);
    ```

To use this stack
  - use degit; https://github.com/Rich-Harris/degit 

    ```bash
      bunx degit copongcopong/pb-baker
    ```
  - or use as template  


To install dependencies:

```bash
bun install
```

To run for the first time (will get pocketbase v0.40.2, then create Superuser)

```bash
bun run initialize!
```


To start local development (auto reload and builds pb-related hooks and jsvm libraries):

```bash
bun run dev
```

To build pb-related hooks and jsvm libraries:

```bash
bun run build
```

## Updating PocketBase

The binary version is pinned in `app/scripts/init.ts`, mirrored in `package.json` (`pocketbase-jsvm` types) and this README. To upgrade:

1. `git fetch`, then cut `chore/pocketbase-X.Y.Z` from `origin/main` (local `main` is often stale).
2. Bump the version in `app/scripts/init.ts`, update all `vX.Y.Z` references in this README, and bump `pocketbase-jsvm` if npm has a newer release.
3. Check the [changelog](https://github.com/pocketbase/pocketbase/releases) for JSVM breaking changes and update hooks in `app/src/` if needed.
4. Verify release assets exist, then test: `bun install && bun run build`, `bun run initialize!`, serve and check hook logs + `/api/health`.

See [`agent.md`](./agent.md) for the full agent-ready prompt covering update and test.

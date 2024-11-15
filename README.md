# PocketBase Baker

PocketBase (v0.23.xx) project initializer in Bun

- designed for PocketBase v0.23.xx
- requires pocketbase
- `/app/**` contains TS files that will be loaded as JSVM libs and hooks (CJS bundled)
- `/app/app.build.ts` - build script for pb_hooks
- `/app/lib.build.ts` - build script for reusable JSVM libs inside pb_hooks `const lib  = require(\`${__hooks}/app/lib\`)`


To install dependencies:

```bash
bun install
```

To build pb-related hooks and jsvm libraries:

```bash
bun run build
```

To start local development (auto reload and builds pb-related hooks and jsvm libraries):

```bash
bun run dev
```

get pocketbase
```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.0-rc13/pocketbase_0.23.0-rc13_linux_arm64.zip #amd64 or _mac_arm64
```

This project was created using `bun init` in bun v1.1.35. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

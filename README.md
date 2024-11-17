# PocketBase Baker

PocketBase (v0.23.xx, Extend with JavaScript) project initializer in Bun

- designed for PocketBase v0.23.xx 
  - see https://pocketbase.io/docs/use-as-framework/
  - https://pocketbase.io/v023upgrade/jsvm/
  - https://pocketbase.io/jsvm-rc/

- `/app/**` contains TS files that will be loaded as JSVM libs and hooks (CJS bundled)
- `/app/app.build.ts` - build script for pb_hooks
- `/app/lib.build.ts` - build script for reusable JSVM libs inside pb_hooks 
    ```
    const lib  = require(`${__hooks}/app/lib`);
    ```

To use this stack (use degit; https://github.com/Rich-Harris/degit)

```bash
bunx degit copongcopong/pb-baker
```

To install dependencies:

```bash
bun install
```

To run for the first time (will get pocketbase v0.23 rc13, create Superuser)

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

get pocketbase
```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.0-rc13/pocketbase_0.23.0-rc13_linux_arm64.zip #amd64 or _mac_arm64
```

This project was created using `bun init` in bun v1.1.35. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

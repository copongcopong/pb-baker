# PocketBase Baker

PocketBase (v0.23.xx, Extend with JavaScript) project initializer in Bun

- designed for PocketBase v0.23.xx and Bundler by Bun (https://bun.sh)
  - see Release Notes: https://github.com/pocketbase/pocketbase/releases/tag/v0.23.0
  - See Docs: https://pocketbase.io/docs/
  - see https://pocketbase.io/docs/use-as-framework/
  - https://pocketbase.io/v023upgrade/jsvm/
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

To run for the first time (will get pocketbase v0.23.1, then create Superuser)

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

This project was created using `bun init` in bun v1.1.35. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

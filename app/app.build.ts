
import { watch } from "fs";
import { Copy } from "@alik6/bun-copy-plugin";

const build = async () => {
  await Bun.sleep(900);
  await Bun.build({
      entrypoints: ['./app/src/app-hooks.ts'],
      outdir: './pb_hooks/app',  // Specify the output directory
      format: "cjs",
      plugins: [
        Copy({
          assets: [
            {from: './app/src/app-hooks/main.pb.js', to: './pb_hooks/main.pb.js'},
            
          ],
          verify: true,
          verbose: true
        })
      ]
  });
}
build();

if (Bun.argv[2] === '--watch') {
  watch(
    import.meta.dir + '/src/app-hooks',
    { recursive: true },
    async (event, filename) => {
      console.log(`Detected ${event} in /app/src/app-hooks/${filename}; Rebuilding ...`);
      await build();
    },
  );
}

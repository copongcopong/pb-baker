
import { watch } from "fs";

const build = async () => {
  await Bun.build({
      entrypoints: ['./app/src/lib.ts'],
      outdir: './pb_hooks/app',  // Specify the output directory
      format: "cjs",
  });
}
build();

if (Bun.argv[2] === '--watch') {
  watch(
    import.meta.dir + '/src/lib',
    { recursive: true },
    async (event, filename) => {
      console.log(`Detected ${event} in /app/src/lib/${filename}; Rebuilding ...`);
      await build();
    },
  );
}



import { watch } from "fs";
import { Copy } from "@alik6/bun-copy-plugin";
import fsRoutes from "fs-routes";

async function buildFsRoutesMap() {
  const fsRoutePath = __dirname + '/src/app-hooks/app';
  const _routes = fsRoutes(fsRoutePath);
  let routes: any = [];
  _routes.forEach((r) => {
    
    const path = r.path.split(__dirname + '/src')[1];

    if (path.endsWith('.route.js')) {
      let rt = r.route.slice(0, -6);
      if (rt.endsWith(`/index`)) {
        rt = rt.slice(0, -6);
      }
      const route = rt;
      //console.log({path, route})
      routes.push({path, route});
    }
   
  });

  await Bun.write(__dirname + '/tmp/route-map.json', JSON.stringify(routes, null, 2));
}

const build = async () => {
  await buildFsRoutesMap();
  await Bun.sleep(900);
  await Bun.build({
      entrypoints: ['./app/src/app-hooks.ts'],
      outdir: './pb_hooks/app',  // Specify the output directory
      format: "cjs",
      plugins: [
        Copy({
          assets: [
            {from: './app/src/app-hooks/main.pb.js', to: './pb_hooks/main.pb.js'},
            {from: './app/src/app-hooks/app/', to: './pb_hooks/app/app'},
            {from: './app/src/app-hooks/views/', to: './pb_hooks/app/views'},
            {from: './app/tmp/route-map.json', to: './pb_hooks/app/route-map.json'},
            {from: './app/src/pb_public/', to: './pb_public'},
          ],
          verify: true,
          verbose: true
        })
      ]
  });
}

build();

if (Bun.argv[2] === '--watch') {
  let debounceTimeout: ReturnType<typeof setTimeout>;
  const watcher = watch(
    import.meta.dir + '/src',
    { recursive: true, persistent: true },
    async (event, filename) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(async () => {
        console.log(`Detected ${event} in ${filename}; Rebuilding ...`);
        await build();
    }, 500); // 1/2-second delay
    },
  );
}

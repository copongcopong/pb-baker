export default function loadRoutes() {
  console.log(`loaded > app:hooks:routes`, new Date());

  const fsmap = require(`${__hooks}/app/route-map.json`);

  console.log(JSON.stringify(fsmap))

  fsmap.forEach((f: any) => {
    const path = f.path.split('/app-hooks')[1];
    const file = `${__hooks}/app${path}`;
    const rpath = f.route;
    const pageFile = require(file);
    if (pageFile) {
      if (pageFile?.handler) {
        const routePath = pageFile?.route || rpath; 
        const methods = pageFile?.methods || ['GET'];
        console.log('routes > ', routePath, file)
        methods.forEach((m: string) => routerAdd(m, routePath, pageFile.handler));
      } else if (typeof pageFile === 'function') {
        console.log('routes > ', rpath, file)
        routerAdd('GET', rpath, pageFile); 
      }
    }
  });
}
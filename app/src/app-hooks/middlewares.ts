const logger = (e: any) => {
  const path = e.request.url.path;
  const method = e.request.method;
  console.log(`ROUTE LOG: ${method} ${path}`);
  return e.next()
}

export default function loadMiddlewares() {
  routerUse(logger);
  //routerAdd("GET", "/_app/{path...}", $apis.static("./pb_public/_app", false))
  //routerAdd("GET", "/tpls/{path...}", $apis.static("./pb_public/tpls", false))
  console.log("loaded > app:hooks:middlewares", new Date())
}
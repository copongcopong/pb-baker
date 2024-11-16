import Handlebars from "handlebars";

export const hbsRenderer = (path: string, partials: any, helpers: any) => {
  let realPath;
  const inapp = $filepath.glob(`${__hooks}/app/app/${path}`);
  if (inapp) realPath = inapp;
  if (!realPath) {
    const inviews = $filepath.glob(`${__hooks}/app/views/${path}`);
    if (inviews) realPath = inviews;
  }

  if (!realPath) {
    throw Error('Missing hbs template file.')
  };
  const _key = ['hbs-view-tpl', realPath];

  if (partials) _key.push(Object.keys(partials));
  if (helpers) _key.push(Object.keys(helpers));
  
  const c = $app.store();
  const key = _key.join(':');

  if(!c.get(key)) {

    if (partials) Handlebars.registerPartial(partials);
    if (helpers) Handlebars.registerHelper(helpers);
    
    //@ts-ignore
    const tpl = String.fromCharCode(...$os.readFile(realPath));
    //console.log(tpl)
    const t = Handlebars.compile(tpl);
    c.set(key, t);
    return {render: t};
  } else {
    //console.log('cached')
    return {render: c.get(key)};
  }
}
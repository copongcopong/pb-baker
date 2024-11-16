import Handlebars from "handlebars";

export const hbsRenderer = (path: string) => {
  let realPath;
  const inapp = $filepath.glob(`${__hooks}/app/app/${path}`);
  if (inapp) realPath = inapp;
  if (!realPath) {
    const inviews = $filepath.glob(`${__hooks}/app/views/${path}`);
    if (inviews) realPath = inviews;
  }

  const c = $app.store();
  const key = path;

  if (!realPath) {
    throw Error('Missing hbs template file.')
  };

  if(!c.get(key)) {
    //@ts-ignore
    const tpl = String.fromCharCode(...$os.readFile(realPath));
    console.log(tpl)
    const t = Handlebars.compile(tpl);
    c.set(key, t);
    return {render: t};
  } else {
    //console.log('cached')
    return {render: c.get(key)};
  }
}
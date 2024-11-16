module.exports = (ctx) => {
  const {$h, hbs} = require(`${__hooks}/app/lib.js`);
  const { debug } = $h;
  try {
    const slug = ctx.request?.pathValue('slug');
    const tpl = 'Slug is {{slug}}!';
   
    const hrender = hbs.compile(tpl);
    $app.store().set('hhx', hrender)
    const t = hbs.compile(tpl);
    debug(ctx.request)
    const view = `Slug: ${slug}`;
    const data = {slug};
    const _hrender = $app.store().get('hhx');
    return ctx.html(200, _hrender(data));
  } catch (err) {
    debug(err)
  }


}
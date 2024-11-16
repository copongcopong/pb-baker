module.exports = {
  route: '/',
  handler: (e) => {
    const {hbsRenderer, hbs, $h} = require(`${__hooks}/app/lib`);
    try {
      const partials = {'myPartials':'Yeah {{makeBold boy}}!'};
      const helpers = hbs.helpers;
      const view = hbsRenderer(`home/tpl.hbs`, partials, helpers)
                    .render({name: new Date(), boy: Math.random() });
      e.html(200, view);
    } catch (e) {
      $h.debug(e)
    }
  }
}
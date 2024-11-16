module.exports = {
  route: '/',
  handler: (e) => {
    const {hbsRenderer, $h} = require(`${__hooks}/app/lib`);
    try {
    const view = hbsRenderer(`home/tpl.hbs`).render({name: new Date() });
    e.html(200, view);
    } catch (e) {
      $h.debug(e)
    }
  }
}
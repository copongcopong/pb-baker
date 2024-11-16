module.exports = {
  handler: (ctx) => {
    const view = 'EXACT';
    return ctx.html(200, view);
  }
}
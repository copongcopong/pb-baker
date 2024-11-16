module.exports = {
  handler: (ctx) => {
    const view = 'how';
    return ctx.html(200, view);
  }
}
export default function loadEventHooks() {
  console.log(`loaded > app:hooks:event-hooks`, new Date());
  onRealtimeConnectRequest((ev) => {
    //const {debug} = require(`${__hooks}/app/lib.js`);
    ev.next();
  });
}
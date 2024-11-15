export default function loadBootstrap() {
  console.log(`loaded > app:hooks:bootstrap`, new Date());
  onBootstrap((ev) => {
    console.log(`app:hooks:bootstrap`);
    ev.next();
  })
}
export default function loadCron() {
  cronAdd("ping", '*/2 * * * *', () => {
    console.log(`ping every 2 minutes`)
  });

  console.log(`loaded > app:hooks:cron`, new Date());
} 
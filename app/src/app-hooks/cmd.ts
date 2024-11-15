export default function loadCmd() {
  const cmdLoader = (obj: any) => $app.rootCmd?.addCommand(new Command(obj)); 

  $app.rootCmd?.addCommand(new Command({
    use: "hello",
    run: (cmd, args) => {
        console.log("Hello world!")
    },
  }));
  cmdLoader({
    use: "hello2",
    run: (cmd: any, args: any) => {
      console.log('wwww', cmd, args)
    }
  });
  console.log(`loaded > app:hooks:cmd`, new Date());
} 
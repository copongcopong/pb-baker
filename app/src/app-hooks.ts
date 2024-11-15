import loadBootstrap from "./app-hooks/bootstrap";
import loadCron from "./app-hooks/cron";
import loadCmd from "./app-hooks/cmd";

//hooks loaded here will be intialize in pb_hooks
export const init = () => {
  loadCmd();
  loadBootstrap();
  loadCron();
}
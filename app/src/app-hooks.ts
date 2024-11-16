import loadBootstrap from "./app-hooks/bootstrap";
import loadCron from "./app-hooks/cron";
import loadCmd from "./app-hooks/cmd";
import loadMiddlewares from "./app-hooks/middlewares";
import loadRoutes from "./app-hooks/routes";

//hooks loaded here will be intialize in pb_hooks
export const init = () => {
  loadCmd();
  loadBootstrap();
  loadCron();
  loadMiddlewares();
  loadRoutes();
}
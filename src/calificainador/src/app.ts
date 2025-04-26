import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  console.log("MAIN");
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes,
  });
  server.start();
}

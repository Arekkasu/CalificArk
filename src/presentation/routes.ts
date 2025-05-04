import { Router } from "express";
import { StudentRoutes } from "./students/routes";
import { AuthRoutes } from "./auth/routes";
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/students", StudentRoutes.routes());
    router.use("/api/auth", AuthRoutes.routes());
    return router;
  }
}

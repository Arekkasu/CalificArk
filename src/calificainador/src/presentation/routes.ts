import { Router } from "express";
import { StudentRoutes } from "./students/routes";
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/students", StudentRoutes.routes());

    return router;
  }
}

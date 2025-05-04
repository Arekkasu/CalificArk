import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  static sessionCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  }
}

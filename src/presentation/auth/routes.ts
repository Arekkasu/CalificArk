import { Router } from "express";
import { EmailService } from "../service/email.service";
import envs from "../../config/envs";
import { AuthService } from "../service/auth.service";
import { AuthController } from "./controller";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";
import { StudentDataSourceImpl } from "../../infrastructure/datasource/student.datasource.impl";

export class AuthRoutes {
  static routes(): Router {
    const router = Router();
    const emailService = new EmailService(
      envs.SERVERMAIL,
      envs.USERNAME_MAIL,
      envs.PASSWORD_MAIL,
    );
    const dataSource = new StudentDataSourceImpl();
    const studentRepository = new StudentRepositoryImpl(dataSource);
    const authService = new AuthService(emailService, studentRepository);
    const authController = new AuthController(authService);

    router.get("/verify/:token", authController.validateEmail);
    return router;
  }
}

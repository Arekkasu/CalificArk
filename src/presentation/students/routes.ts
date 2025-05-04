import { Router } from "express";
import { StudentController } from "./controller";
import { StudentDataSourceImpl } from "../../infrastructure/datasource/student.datasource.impl";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";
import envs from "../../config/envs";
import { AuthService } from "../service/auth.service";
import { EmailService } from "../service/email.service";

export class StudentRoutes {
  static routes(): Router {
    const router = Router();

    const dataSource = new StudentDataSourceImpl();
    const studentRepository = new StudentRepositoryImpl(dataSource);
    const emailService = new EmailService(
      envs.SERVERMAIL,
      envs.USERNAME_MAIL,
      envs.PASSWORD_MAIL,
    );
    const authService = new AuthService(emailService, studentRepository);
    const studentController = new StudentController(
      studentRepository,
      authService,
    );
    router.get("/", studentController.getStudents);
    router.post("/register", studentController.registerStudent);
    return router;
  }
}

import { Router } from "express";
import { StudentController } from "./controller";
import { StudentDataSourceImpl } from "../../infrastructure/datasource/student.datasource.impl";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";

export class StudentRoutes {
  static routes(): Router {
    const router = Router();

    const dataSource = new StudentDataSourceImpl();
    const studentRepository = new StudentRepositoryImpl(dataSource);

    const studentController = new StudentController(studentRepository);
    router.get("/", studentController.getStudents);
    router.post("/register", studentController.registerStudent);
    return router;
  }
}

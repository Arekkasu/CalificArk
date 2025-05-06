import { Request, Response } from "express";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository.impl";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";
import { AuthService } from "../service/auth.service";

export class StudentController {
  constructor(
    private readonly studentRepository: StudentRepositoryImpl,
    private readonly authService: AuthService,
  ) {}

  public getStudents = (req: Request, res: Response) => {
    res.send({ message: "Hello World!" });
  };

  public registerStudent = (req: Request, res: Response) => {
    // REGISTER STUDENT DTO
    const [error, studentDto] = RegisterStudentDto.registerStudent(req.body);
    if (error) {
      res.status(401).json({ error });
      return;
    }

    this.studentRepository
      .registerStudent(studentDto!)
      .then((response) => {
        const { email } = studentDto!.getAllData();

        if (response === "The account already exists") {
          return res.status(409).json({ error: response });
        }
        if (
          response ===
          "You need to verify your email, please check your email again"
        ) {
          this.authService.sendEmailVerification(email);
          return res.status(403).json({ error: response });
        }
        if (response === "The Username Exist") {
          return res.status(409).json({ error: response });
        }
        this.authService.sendEmailVerification(email);
        return res.status(201).json({
          error,
          response,
        });
      })
      .catch((error) => {
        console.log(error);
        // EN CASO DE ERRO ESTO
        res.status(500).json({ error });
      });
  };
}

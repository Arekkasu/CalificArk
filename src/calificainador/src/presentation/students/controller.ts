import { Request, Response } from "express";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";

export class StudentController {
  constructor(private readonly studentRepository: StudentRepositoryImpl) {}

  public getStudents = (req: Request, res: Response) => {
    res.send({ message: "Hello World!" });
  };

  public registerStudent = (req: Request, res: Response) => {
    console.log(req.body);
    const [error, studentDto] = RegisterStudentDto.registerStudent(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    this.studentRepository
      .registerStudent(studentDto!)
      .then((response) => {
        res.status(201).json({
          error,
          studentDto,
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
}

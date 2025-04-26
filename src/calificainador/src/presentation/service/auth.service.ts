import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";
import { EmailSevice } from "./email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailSevice,
    private readonly studentRepository: StudentRepositoryImpl,
  ) {}
}

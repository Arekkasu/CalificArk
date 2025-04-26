import {
  isRegisteredResponse,
  isRegistereredOptions,
  StudentDataSource,
} from "../../domain/datasources/student.datasource";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";
import { StudentRepository } from "../../domain/repositories/student.repository";

export class StudentRepositoryImpl implements StudentRepository {
  constructor(private readonly studentDatasource: StudentDataSource) {}
  isRegistered(options: isRegistereredOptions): Promise<isRegisteredResponse> {
    throw new Error("Method not implemented.");
  }

  registerStudent(registerStudentDto: RegisterStudentDto): Promise<string> {
    return this.studentDatasource.registerStudent(registerStudentDto);
  }
}

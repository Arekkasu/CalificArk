import {
  isRegisteredResponse,
  isRegistereredOptions,
  StudentDataSource,
} from "../../domain/datasources/student.datasource";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";
import { StudentEntity } from "../../domain/entities/student.entity";
import { StudentRepository } from "../../domain/repositories/student.repository";

export class StudentRepositoryImpl implements StudentRepository {
  constructor(private readonly studentDatasource: StudentDataSource) {}
  getUser(username: string): Promise<[Error?, StudentEntity?]> {
    return this.studentDatasource.getUser(username);
  }
  setVerified(email: string): Promise<[any, string?]> {
    return this.studentDatasource.setVerified(email);
  }
  isRegistered(options: isRegistereredOptions): Promise<isRegisteredResponse> {
    return this.studentDatasource.isRegistered(options);
  }

  registerStudent(registerStudentDto: RegisterStudentDto): Promise<string> {
    return this.studentDatasource.registerStudent(registerStudentDto);
  }
}

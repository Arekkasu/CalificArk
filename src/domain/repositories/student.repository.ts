import {
  isRegistereredOptions,
  isRegisteredResponse,
} from "../datasources/student.datasource";
import { RegisterStudentDto } from "../dtos/register-student.dto";
import { StudentEntity } from "../entities/student.entity";

export abstract class StudentRepository {
  abstract registerStudent(
    registerStudentDto: RegisterStudentDto,
  ): Promise<string>;
  abstract isRegistered(
    options: isRegistereredOptions,
  ): Promise<isRegisteredResponse>;
  abstract setVerified(email: string): Promise<[any, string?]>;
  abstract getUser(username: string): Promise<[Error?, StudentEntity?]>;
}

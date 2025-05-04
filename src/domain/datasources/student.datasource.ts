import { RegisterStudentDto } from "../dtos/register-student.dto";

export interface isRegistereredOptions {
  email?: string;
  username?: string;
}

export interface isRegisteredResponse {
  existEmail?: boolean;
  existUsername?: boolean;
  existEmailVerified?: boolean;
}

export abstract class StudentDataSource {
  abstract registerStudent(
    registerStudent: RegisterStudentDto,
  ): Promise<string>;
  abstract isRegistered(
    options: isRegistereredOptions,
  ): Promise<isRegisteredResponse>;

  abstract setVerified(email: string): Promise<[any, string?]>;
}

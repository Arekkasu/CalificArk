import prisma from "../../data/postgres";
import {
  isRegistereredOptions,
  StudentDataSource,
  isRegisteredResponse,
} from "../../domain/datasources/student.datasource";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";

export class StudentDataSourceImpl implements StudentDataSource {
  async isRegistered(
    options: isRegistereredOptions,
  ): Promise<isRegisteredResponse> {
    try {
      const { email, username } = options;
      const exist = await prisma.students.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      return {
        existEmail: exist?.email === email,
        existUsername: exist?.username === username,
      };
    } catch (e) {
      console.log(e);
      return {
        existEmail: true,
        existUsername: true,
      };
    }
  }
  async registerStudent(
    registerStudentDto: RegisterStudentDto,
  ): Promise<string> {
    const { email, username, password } = registerStudentDto.getAllData();

    try {
      const { existEmail, existUsername } = await this.isRegistered({
        email,
        username,
      });

      if (existEmail) {
        return "The email Exist";
      }
      if (existUsername) {
        return "The Username Exist";
      }

      await prisma.students.create({
        data: {
          email,
          username,
          password,
          email_verified: false,
        },
      });
      return "Student Created Succesfully. Please Verify Your Email";
    } catch (e) {
      console.log(e);
      return "Error on Creating Student";
    }
  }
}

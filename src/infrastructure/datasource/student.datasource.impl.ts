import prisma from "../../data/postgres";
import {
  isRegistereredOptions,
  StudentDataSource,
  isRegisteredResponse,
} from "../../domain/datasources/student.datasource";
import { RegisterStudentDto } from "../../domain/dtos/register-student.dto";
import { StudentEntity } from "../../domain/entities/student.entity";
import { validateEmail } from "../../utils/validators";

export class StudentDataSourceImpl implements StudentDataSource {
  async getUser(username: string): Promise<[Error?, StudentEntity?]> {
    try {
      const user = await prisma.students.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) return [new Error("User not found"), undefined];
      const studentEntity = StudentEntity.fromObjectUser(user);
      return [undefined, studentEntity];
    } catch (error) {
      return [error as Error, undefined];
    }
  }
  async setVerified(email: string): Promise<[any, string?]> {
    if (!email) return [null, "Email is required"];
    try {
      await prisma.students.update({
        where: {
          email,
        },
        data: {
          email_verified: true,
        },
      });

      return [null, "Email verified successfully"];
    } catch (e) {
      return [e, "Error verifying email"];
    }
  }

  async isRegistered(
    options: isRegistereredOptions,
  ): Promise<isRegisteredResponse> {
    try {
      const { email, username } = options;
      const exist = await prisma.students.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
        select: {
          email: true,
          username: true,
          email_verified: true,
        },
      });

      return {
        existEmail: exist?.email === email,
        existUsername: exist?.username === username,
        existEmailVerified: exist?.email_verified,
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
      const { existEmail, existUsername, existEmailVerified } =
        await this.isRegistered({
          email,
          username,
        });

      if (existEmail && existEmailVerified) {
        return "The account already exists";
      }
      if (existEmail && !existEmailVerified) {
        return "You need to verify your email, please check your email again";
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

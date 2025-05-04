import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const bcryptAdapter = {
  hash: (password: string): string => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },
  compare: (password: string, hash: string): boolean => {
    return compareSync(password, hash);
  },
};

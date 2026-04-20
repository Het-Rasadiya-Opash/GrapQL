import { User } from "@/models/user.js";


export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (_parent: unknown, arg: { id: string }) => {
  const user = await User.findById(arg.id);
  return user;
};

type NewUserInput = {
  username: string;
  email: string;
  password?: string;
  admin?: boolean;
};

export const createUser = async (
  parent: unknown,
  arg: { input: NewUserInput },
) => {
  const user = await User.create({
    username: arg.input.username,
    email: arg.input.email,
    password: arg.input.password,
    admin: arg.input.admin ?? false,
  });

  return user;
};

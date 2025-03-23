import { prisma } from "./prisma";
import { hash } from "bcryptjs";

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
}

export async function registerUser(userData: UserRegistrationData) {
  const { email, password, firstName, lastName, username, phone } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { 
      OR: [
        { email },
        ...(username ? [{ username }] : []),
      ]
    }
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already in use");
    }
    if (existingUser.username === username) {
      throw new Error("Username already taken");
    }
  }

  // Hash the password
  const hashedPassword = await hash(password, 12);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      phone,
      name: `${firstName || ''} ${lastName || ''}`.trim() || undefined,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      firstName: true,
      lastName: true,
      image: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      firstName: true,
      lastName: true,
      image: true,
    },
  });
}
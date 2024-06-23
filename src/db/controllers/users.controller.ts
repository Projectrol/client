import { User, users } from "../repositories/users.repo";

export const UsersController = {
  getUserById(id: number): User | null {
    return users.find((u) => u.id === id) ?? null;
  },
  searchByName(name: string): User[] {
    return users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  },
  searchByEmail(email: string): User[] {
    return users.filter((user) =>
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  },
};

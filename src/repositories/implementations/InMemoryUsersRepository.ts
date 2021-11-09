import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((x) => x.email === email);
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}

import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { InMemoryUsersRepository } from "../../repositories/implementations/InMemoryUsersRepository";

const mailTrapMailProvider = new MailTrapMailProvider();
const inMemoryUserRepository = new InMemoryUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  inMemoryUserRepository,
  mailTrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };

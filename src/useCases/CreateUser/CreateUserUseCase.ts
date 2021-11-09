import { IMailProvider } from "./../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IUsersRepository } from "./../../repositories/IUserRepository";
import { User } from "../../entities/User";
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const user = new User(data);
    await this.usersRepository.save(user);
    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do app",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem vindo à plataforma",
      body: "<p>Você já pode fazer login na nossa aplicação</p>",
    });
  }
}

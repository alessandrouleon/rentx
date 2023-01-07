import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    public async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        return user;
    }
}

export { ProfileUserUseCase }
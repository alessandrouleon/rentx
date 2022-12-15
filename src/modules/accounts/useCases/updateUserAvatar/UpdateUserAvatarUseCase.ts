import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
    user_id: string;
    avatar_file: any;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: UsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id) as any;

        if (user) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }

}

export { UpdateUserAvatarUseCase }
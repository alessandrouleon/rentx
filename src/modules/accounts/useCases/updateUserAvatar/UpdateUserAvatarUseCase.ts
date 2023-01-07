import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IStorageProvider } from "@shared/container/provider/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    avatar_file: any;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: UsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id) as any;
        
       
       
        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }

}

export { UpdateUserAvatarUseCase }
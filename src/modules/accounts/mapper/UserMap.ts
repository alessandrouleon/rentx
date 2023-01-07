import { ICreateUserRepositoryDTO } from "../dto/ICreateUserRepositoryDTO";
import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from 'class-transformer';

class UserMap {
    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
        avatar_url
    }: User): ICreateUserRepositoryDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            avatar_url
        });
        return user;
    }
}

export { UserMap }
import { ICreateUsersDTO } from "../dto/IUsersCreateDTO";
import { User } from "../entities/user";

interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository, }
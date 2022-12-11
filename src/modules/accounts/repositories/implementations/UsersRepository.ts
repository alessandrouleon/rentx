import { ICreateUsersDTO } from "@modules/accounts/dto/IUsersCreateDTO";
import { User } from "@modules/accounts/entities/user";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, driver_license, password }: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password
        });
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
      const existEmail = await this.repository.findOne({ email });
      console.log("Existe no repository:", existEmail);
      
      return existEmail;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne(id);
        return user;
    }

}

export { UsersRepository }
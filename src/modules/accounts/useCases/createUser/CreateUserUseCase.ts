import { ICreateUsersDTO } from "@modules/accounts/dto/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

@injectable()
class CreateUseruseCase {

    constructor(
        @inject("UsersRepository")
        private createUsersRepository: IUsersRepository
    ) { }

    async execute({ name, email, driver_license, password }: ICreateUsersDTO): Promise<void> {

        const existEmail = await this.createUsersRepository.findByEmail(email);
        
        if(existEmail){
          throw new AppError("Email already exists!");
        }

        const passwordHash = await hash(password, 8);

        await this.createUsersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        });
    }

}

export { CreateUseruseCase }
import { ICreateUsersDTO } from "@modules/accounts/dto/IUsersCreateDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "error/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUseruseCase {

    constructor(
        @inject("UsersRepository")
        private createUsersRepository: IUsersRepository
    ) { }

    async execute({ name, email, driver_license, password }: ICreateUsersDTO): Promise<void> {

        const existEmail = await this.createUsersRepository.findByEmail(email);
        
        console.log("Existe no useCase::", existEmail);
        
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
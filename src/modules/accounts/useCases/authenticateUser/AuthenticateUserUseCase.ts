import { compare } from "bcrypt";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AppError } from "error/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password icorrect!");
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            throw new AppError("Email or password icorrect!");
        }

        const token = sign({}, "aa4a4196f41ac6f5b5bebda26630d4e0", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tockenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tockenReturn;
    }

}

export { AuthenticateUserUseCase }
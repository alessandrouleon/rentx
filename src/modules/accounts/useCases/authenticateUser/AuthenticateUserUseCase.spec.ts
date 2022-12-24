import { expect, jest, test } from '@jest/globals';
import { AppError } from '@shared/error/AppError';
import { ICreateUsersDTO } from "@modules/accounts/dto/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUseruseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoriInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DateProvider } from '@shared/container/provider/DayjsProvider/implementations/DateProvider';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUSerUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoriInMemory;
let dateProvider: DateProvider;
let creteUserUseCase: CreateUseruseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoriInMemory();
        dateProvider = new DateProvider();
        authenticateUSerUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        creteUserUseCase = new CreateUseruseCase(usersRepositoryInMemory);
    });

    it("shhold be able to authenticate an user", async () => {
        const user: ICreateUsersDTO = {
            driver_license: "000123",
            email: "users@gmail.com",
            password: "12345678",
            name: "User Test"
        };
        await creteUserUseCase.execute(user);

        const result = await authenticateUSerUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("shhold not be able to authenticate an noneexistent user", () => {
        expect(async () => {
            await authenticateUSerUseCase.execute({
                email: "test@gmail.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shhold not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                driver_license: "99999",
                email: "user@user.com",
                password: "123",
                name: "Maria do rosario"
            }
            await creteUserUseCase.execute(user);

            await authenticateUSerUseCase.execute({
                email: user.email,
                password: "incorrectpassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});
import { ICreateUsersTokensDTO } from "@modules/accounts/dto/ICreateUsersTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoriInMemory implements IUsersTokensRepository {
    usersTokens: UserTokens[] = [];

    async create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });
        this.usersTokens.push(userToken);
        return userToken;
    }


    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token);
        return userToken;
    }


    async deletById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((ut) => ut.id === id);
        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }



    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find((ut) => ut.refresh_token === refresh_token);
        return userToken;
    }

}

export { UsersTokensRepositoriInMemory }
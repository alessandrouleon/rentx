import { ICreateUsersTokensDTO } from "../dto/ICreateUsersTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";


interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
    deletById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository }
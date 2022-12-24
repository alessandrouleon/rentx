import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoriInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DateProvider } from "@shared/container/provider/DayjsProvider/implementations/DateProvider";
import { MailProviderInMemory } from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { expect, jest, test } from '@jest/globals';
import { AppError } from "@shared/error/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoriInMemory;
let dateProvider: DateProvider;
let mailProvider: MailProviderInMemory;



describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoriInMemory();
    dateProvider = new DateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,

    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "743734374",
      email: "joao@gmail.com",
      name: "joao santos",
      password: "@wew41"
    });

    await sendForgotPasswordMailUseCase.execute("joao@gmail.com");
    expect(sendMail).toHaveBeenCalled();
  });


  it("should not be able to send an email if does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("maria@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "5r4444r",
      email: "felipe@gmail.com",
      name: "felipe melo",
      password: "@wew41"
    });

    await sendForgotPasswordMailUseCase.execute("felipe@gmail.com");
    expect(generateTokenMail).toBeCalled();
  });


});
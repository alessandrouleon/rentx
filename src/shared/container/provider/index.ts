
import { container } from "tsyringe";
import { IDateProvider } from "./DayjsProvider/IDateProvider";
import { DateProvider } from "./DayjsProvider/implementations/DateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
)

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)
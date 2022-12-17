
import { container } from "tsyringe";
import { IDateProvider } from "./DayjsProvider/IDateProvider";
import { DateProvider } from "./DayjsProvider/implementations/DateProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
)
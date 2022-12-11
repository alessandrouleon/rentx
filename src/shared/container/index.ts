import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { container } from "tsyringe";


container.register<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.register<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.register<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)
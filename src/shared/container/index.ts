import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { container } from "tsyringe";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ICarImagensRepository } from "@modules/cars/repositories/ICarImagensRepository";
import { CarImagensRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagensRepository";


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

container.register<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.register<ICarImagensRepository>(
    "CarImagensRepository",
    CarImagensRepository
)
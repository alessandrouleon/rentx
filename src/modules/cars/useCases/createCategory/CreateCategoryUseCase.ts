import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "@shared/error/AppError";


interface IRequest {
    id?: number;
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
        ) { }

    async execute({ name, description }: IRequest): Promise<void> {

        const categoryAllreadyExiste = await this.categoriesRepository.findByName(name);

        if (categoryAllreadyExiste) {
            throw new AppError("Category already existe!");
        }
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
        ) { }

  async execute({ name, description }: IRequest): Promise <void> {

        const specificatioAlreadyExists = await this.specificationRepository.findByName(name)

        if (specificatioAlreadyExists) {
            throw new AppError("Specification Already exists!");
        }

      await this.specificationRepository.create({
            name,
            description
        })

    }

}

export { CreateSpecificationUseCase }
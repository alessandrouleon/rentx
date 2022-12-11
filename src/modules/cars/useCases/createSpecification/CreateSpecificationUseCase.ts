import { AppError } from "error/AppError";
import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: SpecificationRepository) { }

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
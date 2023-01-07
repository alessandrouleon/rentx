import { CarImagens } from "@modules/cars/infra/typeorm/entities/CarImagens";
import { ICarImagensRepository } from "@modules/cars/repositories/ICarImagensRepository";
import { IStorageProvider } from "@shared/container/provider/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    image_name: string[];
}

@injectable()
class UploadCarImagensUseCase {

    constructor(
        @inject("CarImagensRepository")
        private carImagensRepository: ICarImagensRepository,
        @inject("StorageProvider")
        private storateProvider: IStorageProvider
    ) { }

    async execute({ car_id, image_name }: IRequest): Promise<void> {
        image_name.map(async (image) => {
            await this.carImagensRepository.create(car_id, image);
            await this.storateProvider.save(image, "cars");
        });
    }


}

export { UploadCarImagensUseCase }
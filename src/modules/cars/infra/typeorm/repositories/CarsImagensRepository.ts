import { ICarImagensRepository } from "@modules/cars/repositories/ICarImagensRepository";
import { getRepository, Repository } from "typeorm";
import { CarImagens } from "../entities/CarImagens";


class CarImagensRepository implements ICarImagensRepository {
    private repository: Repository<CarImagens>;

    constructor() {
        this.repository = getRepository(CarImagens);
    }

    async create(car_id: string, image_name: string): Promise<CarImagens> {
        const carImage = this.repository.create({
            car_id, image_name
        });

        await this.repository.save(carImage);

        return carImage;
    }

}

export { CarImagensRepository }
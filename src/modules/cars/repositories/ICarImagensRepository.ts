import { CarImagens } from "../infra/typeorm/entities/CarImagens";

interface ICarImagensRepository {
    create(car_id: string, image_name: string): Promise<CarImagens>;
}


export { ICarImagensRepository }
import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }


    async create({ name, category_id, daily_rate, description, fine_amount, license_plate, brand, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            brand,
            specifications,
            id
        });

        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }


    async findAlvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }
        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = : category_id", { category_id });
        }
        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car | undefined> {
       const checkById = await this.repository.findOne(id);
       return checkById;
    }

}

export { CarsRepository }
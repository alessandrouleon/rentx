import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, id }: ICreateCarDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id
        });
        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAlvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const allCars = this.cars
            .filter((car) => {
                if (
                    car.available === true ||
                    (brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name)
                ) {
                    return car;
                }
            })
        return allCars;
    }

    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find((car) => car.id === id)
    }



}

export { CarsRepositoryInMemory }
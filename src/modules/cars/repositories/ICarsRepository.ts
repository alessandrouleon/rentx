import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car | undefined>;
    findAlvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car | undefined>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}  

export { ICarsRepository }
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { expect, jest, test } from '@jest/globals';
import { AppError } from "@shared/error/AppError";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, specificationRepositoryInMemory);
    });

    it("should be able to add a new specification to  a now-existent car", async () => {
        expect(async () => {
            const car_id = "123";
            const specifications_id = ["12345"]
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test",
            description: "test"
        });

        const specifications_id = [specification.id]

      const specificationCars =  await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });

       expect(specificationCars).toHaveProperty("specifications");
       expect(specificationCars.specifications.length).toBe(1);

    });

});
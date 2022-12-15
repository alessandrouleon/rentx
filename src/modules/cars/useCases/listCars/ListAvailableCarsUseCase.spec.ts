import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsrepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {

    beforeEach(() => {
        carsrepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsrepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
      const car = await  carsrepositoryInMemory.create({
            name: "Car1",
            description: "Description Car",
            daily_rate: 111,
            license_plate: "ABCD-1132",
            fine_amount: 30,
            brand: "Toyotas",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by brand", async () => {
        const car = await  carsrepositoryInMemory.create({
            name: "Car2",
            description: "Description Car brand teste",
            daily_rate: 111,
            license_plate: "ABCD-1132",
            fine_amount: 30,
            brand: "Car brand teste",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand teste"
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await  carsrepositoryInMemory.create({
            name: "Car3",
            description: "Description Car name",
            daily_rate: 111,
            license_plate: "ABCD-3344",
            fine_amount: 20,
            brand: "Car name teste",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3"
        });
        expect(cars).toEqual([car]);
    });


    it("should be able to list all available cars by category", async () => {
        const car = await  carsrepositoryInMemory.create({
            name: "Car4",
            description: "Description Car category",
            daily_rate: 111,
            license_plate: "ABCD-5566",
            fine_amount: 10,
            brand: "Car category teste",
            category_id: "category_id_1122"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id_1122"
        });
        expect(cars).toEqual([car]);
    });

});
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";
import { expect, jest, test } from '@jest/globals';
import { AppError } from "@shared/error/AppError";
import dayjs from "dayjs";
import { DateProvider } from "@shared/container/provider/DayjsProvider/implementations/DateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DateProvider;


describe("Create Rentals", () => {

    const dayAdd24Hors = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DateProvider();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory, 
            dateProvider,
            carsRepositoryInMemory
        );

    });

    it("should be able create new rental", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test1",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "123",
            brand: "brand"
        });
        const rental = await createRentalsUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hors,
        });

        expect(rental).toHaveProperty("id");
        // expect(rental).toHaveProperty("start_date");
    });



    it("should not be able create new rental if there is another to the user", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hors,
            });

            const rental = await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hors,
            });
        })

    });


    it("should not be able create new rental if there is another to the same car", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hors,
            });

            await createRentalsUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hors,
            });
        })

    });



    it("should not be able create new rental invalid return time", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);

    });


});
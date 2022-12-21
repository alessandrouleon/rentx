import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";
import { expect, jest, test } from '@jest/globals';
import { AppError } from "@shared/error/AppError";
import dayjs from "dayjs";
import { DateProvider } from "@shared/container/provider/DayjsProvider/implementations/DateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let dateProvider: DateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createrentalsUseCase: CreateRentalsUseCase;


describe("Create Rentals", () => {

    const dayAdd24Hors = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dateProvider = new DateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createrentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory, dateProvider, carsRepositoryInMemory);

    });

    it("should be able create new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Description Car2",
            daily_rate: 150,
            license_plate: "ABCD-100",
            fine_amount: 21,
            brand: "carro placa",
            category_id: "bf163b44-69ba-4d0b-b7c4-1e7a7a40ac43"
        });
        const rental = await createrentalsUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hors,
        });
       
        expect(rental).toHaveProperty("id");

    });



    it("should not be able create new rental if there is another to the user", async () => {
        expect(async () => {
            await createrentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hors,
            });

            const rental = await createrentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hors,
            });
        })

    });


    it("should not be able create new rental if there is another to the same car", async () => {
        expect(async () => {
            await createrentalsUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hors,
            });

            await createrentalsUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hors,
            });
        })

    });



    it("should not be able create new rental invalid return time", async () => {
        expect(async () => {
            await createrentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);

    });


});
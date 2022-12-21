import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "./../../repositories/in-memory/CategoriesRepositoryInMemory";
import { expect, jest, test } from '@jest/globals';
import { AppError } from "../../../../shared/error/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("shoud be able to create a new category", async () => {
        const category = {
            name: "Category name Test",
            description: "Category description Test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("shoud not be able to create a new category with name exists", async () => {
        const category = {
            name: "Category name Test",
            description: "Category description Test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toBeInstanceOf(AppError);
    })

});
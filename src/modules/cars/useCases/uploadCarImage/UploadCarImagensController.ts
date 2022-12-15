import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagensUseCase } from "./UploadCarImagensUseCase";

interface IFiles {
    filename: string;
}
class UploadCarImagensController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const image = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImagensUseCase);

        const image_name = image.map((file) => file.filename);

        const carIMG = await uploadCarImageUseCase.execute({
            car_id: id,
            image_name
        });

        return response.status(201).send(carIMG);
    }
}

export { UploadCarImagensController }
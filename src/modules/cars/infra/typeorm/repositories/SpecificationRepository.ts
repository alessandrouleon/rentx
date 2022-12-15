import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationRepository";


class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification);
    }


    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description });
        await this.repository.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification | undefined> {
        const specification = this.repository.findOne({ name });
        return specification;
    }

    async list(): Promise<Specification[]> {
        const findAll = await this.repository.find();
        return findAll;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = await this.repository.findByIds(ids);
        return allSpecifications;
    }



}

export { SpecificationRepository }
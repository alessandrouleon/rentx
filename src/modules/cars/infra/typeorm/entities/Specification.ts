
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuIdv4 } from "uuid";

@Entity("specifications")
class Specification {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuIdv4();
        }
    }
}

export { Specification }
import {MigrationInterface, QueryRunner, Table, TreeChildren} from "typeorm";

export class CreateUsers1670551766801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar(100)"
                    },
                    {
                        name: "username",
                        type: "varchar(100)",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar(100)"
                    },
                    {
                        name: "email",
                        type: "varchar(100)"
                    },
                    {
                        name: "driver_license",
                        type: "varchar(100)"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}

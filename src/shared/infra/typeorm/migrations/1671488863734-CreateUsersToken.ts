import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1671488863734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
        new Table({
            name: "users_token",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "refresh_token",
                    type: "varchar(256)"
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "expires_date",
                    type: "timestamp"
                },
                {
                    name: "create_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                   name: "FKUserToken",
                   referencedTableName: "users",
                   referencedColumnNames: ["id"],
                   columnNames: ["user_id"],
                   onUpdate: "CASCADE",
                   onDelete: "CASCADE" 
                }
            ]
        })
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_token");
    }

}

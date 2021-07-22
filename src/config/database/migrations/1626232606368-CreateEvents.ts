import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvents1626232606368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'events',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'date',
                        type: 'timestamp'
                    },
                    {
                        name: 'image',
                        type: 'text'
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'video',
                        type: 'varchar'
                    },
                    {
                        name: 'is_cancelled',
                        type: 'boolean'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }

}

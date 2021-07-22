import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventEntity } from './database/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [
    EventsController
  ],
  providers: [EventsService]
})
export class EventsModule { }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { Repository } from 'typeorm';
import { EventEntity } from './database/entities/event.entity';
import { Event } from './model/event';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>
    ) { }

    async getAll(): Promise<Event[]> {
        return await this.eventRepository.find({
            select: [
                'id',
                'date',
                'title',
                'description',
                'isCancelled'
            ]
        })
    }

    async findById(id: string) {
        return await this.eventRepository.findOne(id);
    }

    async add(event: Event): Promise<Event> {
        const eventEntity = EventEntity.fromEvent(event);
        console.log(eventEntity);
        return await this.eventRepository.save(eventEntity)
    }

    async cancelEvent(id: string): Promise<Event> {
        const event = await this.eventRepository.findOne(id);
        if (event == null) throw new exception('Event not found!')
        event.isCancelled = true;
        return this.eventRepository.save(event);
    }

    async update(id: string, event: Event): Promise<Event> {
        const eventDB = await this.eventRepository.findOne(id);
        if (!eventDB) {
            throw new Error('Event doesnt exist!');
        }
        event.id = id;
        return this.add(event);
    }

    async delete(id: string) {
        const eventDB = await this.eventRepository.findOne(id);
        if (!eventDB) {
            throw new Error('Event doesnt exist!');
        }
        return await this.eventRepository.delete({ id })
    }
}

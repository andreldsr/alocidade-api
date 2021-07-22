import { EventsService } from './events.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Event } from './model/event';

@Controller('events')
export class EventsController {

    constructor(private eventService: EventsService) { }

    @Get()
    async findAll(): Promise<Event[]> {
        return this.eventService.getAll()
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Event> {
        return this.eventService.findById(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() event: Event): Promise<Event> {
        return this.eventService.add(event);
    }

    @Post('/cancel/:id')
    async cancelEvent(@Param('id') id: string): Promise<Event> {
        return this.eventService.cancelEvent(id);
    }

    @Put('/:id')
    async updateEvent(@Param('id') id: string, @Body() event: Event): Promise<Event> {
        return this.eventService.update(id, event);
    }

    @Delete('/:id')
    async deleteEvent(@Param('id') id: string) {
        return this.eventService.delete(id);
    }
}

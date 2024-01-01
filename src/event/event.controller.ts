import { Body, Controller, Get, Post, Put, Delete, NotFoundException, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private readonly eventService:EventService) { } 

    @Get() 
    async findAll(): Promise<Event[]> {
        return await this.eventService.findAll();
    }

    @Get(':id')
    async getEvent(@Param('id') id: string): Promise<Event> {
        const event = await this.eventService.findSingleEvent(+id); 
        if (!event) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }
        return event; 
    }

    @Post()
    async createEvent(@Body() event:Event): Promise<Event> {
        return await this.eventService.createEvent(event); 
    }

    @Put(':id')
    async updateEvent(@Param('id') id: number, @Body() event: Event): Promise<Event> {
        return await this.eventService.updateEvent(id, event);
    }

    @Delete(':id')
    async deleteEvent(@Param('id') id: number): Promise<void> {
        const event = await this.eventService.findSingleEvent(id);
        if (!event) {
            throw new Error('User not found'); 
        } 
        this.eventService.deleteEvent(id); 
    }
}

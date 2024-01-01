import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) { }

    async findAll(): Promise<Event[]> {
        return await this.eventRepository.find();
    }

    async findSingleEvent(id: number): Promise<Event> {
        const event = await this.findEvent(id);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return event;
    }

    async createEvent(event: Event): Promise<Event> {
        const newEvent = await this.eventRepository.create(event);
        return await this.eventRepository.save(newEvent);
    }

    async deleteEvent(id: number): Promise<Event> {
        const event = await this.findEvent(id);
        await this.eventRepository.delete(id);
        return event;
    }

    async updateEvent(id: number, event: Event): Promise<Event> {
        try {
            const updatedEvent = await this.findEvent(id);
            this.eventRepository.merge(updatedEvent, event);
            return await this.eventRepository.save(updatedEvent);
        } catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new NotFoundException('Event not found');
            }
            throw error;
        }
    }

    private async findEvent(id: number): Promise<Event | undefined> {
        return await this.eventRepository.findOne({ where: { id } as any });
    }
}

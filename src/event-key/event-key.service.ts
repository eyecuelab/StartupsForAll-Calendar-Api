import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventKeyDto } from './dto/create-event-key.dto';
import { EventKey } from './entities/event-key.entity';

@Injectable()
export class EventKeyService {
  constructor(
    @InjectRepository(EventKey)
    private eventKeyRepository: Repository<EventKey>
  ) {}

  async createEventKey(createEventKeyDto: CreateEventKeyDto) {
    const newEventKey = await this.eventKeyRepository.create(createEventKeyDto);
    await this.eventKeyRepository.save(createEventKeyDto);
    return newEventKey;
  }
}

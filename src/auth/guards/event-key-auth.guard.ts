import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { EventKeyStrategy } from '../strategies/eventKey.strategy';

@Injectable()
export class EventKeyAuthGuard implements CanActivate {
  constructor(private readonly eventKeyStrategy: EventKeyStrategy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const res = await this.eventKeyStrategy.validate(request.body.password);
    // if no id is found, the user did not pass auth either by name or password
    // double ! converts to boolean if field exists
    return !!res.id;
  }
}

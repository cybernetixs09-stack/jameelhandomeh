
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateWaitingPartyDto } from './dto/CreateWaitingParty.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  
  @Post('join')
 async join(@Body() CreateWaitingPartyDto: CreateWaitingPartyDto) {
    return await this.customerService.join(CreateWaitingPartyDto);
  }

  
  @Get(':ticket/position')
 async getPosition(@Param('ticket') ticket: string) {
    return await  this.customerService.getPosition(Number(ticket));
  }
}

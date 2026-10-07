
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // Get all active tickets
  @Get('tickets')
 async getAllTickets() {
    return await this.staffService.getAllTickets();
  }

  // Cancel a ticket
  @Delete('tickets/:ticket')
  async cancelTicket(@Param('ticket') ticket: string) {
    return await this.staffService.cancelTicket(Number(ticket));
  }
}

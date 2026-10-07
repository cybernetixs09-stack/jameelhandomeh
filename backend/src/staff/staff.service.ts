import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAllTickets() {
    try {
      return await this.prisma.waitingParty.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tickets');
    }
  }

  async cancelTicket(ticket: number) {
    try {
      
      const existingTicket = await this.prisma.waitingParty.findUnique({
        where: { ticket },
      });

      if (!existingTicket) {
        throw new NotFoundException(`Ticket #${ticket} not found`);
      }

    
      return await this.prisma.waitingParty.update({
        where: {
          ticket,
        },
        data: {
          flag: false,
        },
      });
    } catch (error) {
      
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to cancel ticket #${ticket}`,
      );
    }
  }
}
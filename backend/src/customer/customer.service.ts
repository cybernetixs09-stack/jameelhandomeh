import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { CreateWaitingPartyDto } from './dto/CreateWaitingParty.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: DatabaseService) {}

 async join(createWaitingPartyDto: CreateWaitingPartyDto) {
    try {
   
      return await this.prisma.$transaction(async (tx) => {
        const lastTicket = await tx.waitingParty.findFirst({
          orderBy: {
            ticket: 'desc',
          },
          select: {
            ticket: true,
          },
        });

        const nextTicket = (lastTicket?.ticket ?? 0) + 1;

        const customer = await tx.waitingParty.create({
          data: {
            name: createWaitingPartyDto.name,
            partySize: Number(createWaitingPartyDto.partySize), 
            ticket: nextTicket,
            flag: true,
          },
          select: {
            ticket: true,
          },
        });

        return {
          ticket: customer.ticket,
        };
      });
    } catch (error) {
    
      console.error('Error in join process:', error);

      throw new InternalServerErrorException(
        'Failed to create waiting party',
      );
    }
  }

  async getPosition(ticket: number) {
    try {
      const customer = await this.prisma.waitingParty.findUnique({
        where: {
          ticket,
        },
      });

      if (!customer || !customer.flag) {
        throw new NotFoundException('Ticket not found');
      }

      const customersBefore = await this.prisma.waitingParty.count({
        where: {
          flag: true,
          createdAt: {
            lt: customer.createdAt,
          },
        },
      });

      return {
        ticket: customer.ticket,
        customersBefore,
      };
    } catch (error) {
      
      if (error instanceof NotFoundException) {
        throw error;
      }

      
      throw new InternalServerErrorException('Failed to calculate position');
    }
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, StaffModule, CustomerModule,ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';
import { TourModule } from 'src/tour/tour.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), TourModule, BookingModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}

import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entity/tour.entity';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]), SellerModule],
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}

import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entity/seller.entity';
import { TourModule } from 'src/tour/tour.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), TourModule],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}

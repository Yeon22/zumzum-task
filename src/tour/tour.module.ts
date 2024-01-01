import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entity/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}

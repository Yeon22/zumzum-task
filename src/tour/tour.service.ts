import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './entity/tour.entity';
import { Repository } from 'typeorm';
import { CreateTourDto, UpdateTourHolidayDto } from './dto/tour.dto';
import { SellerService } from 'src/seller/seller.service';

@Injectable()
export class TourService {
    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,
        @Inject(SellerService)
        private readonly sellerService: SellerService
    ) {}

    async create(createTourDto: CreateTourDto): Promise<Tour> {
        const seller = await this.sellerService.findById(createTourDto.seller_id);
        if (!seller) {
            throw new BadRequestException('존재하지 않는 판매자입니다.');
        }

        const tour = new Tour();
        tour.title = createTourDto.title;
        tour.description = createTourDto.description;
        tour.tour_period = createTourDto.tour_period;
        tour.location = createTourDto.location;
        tour.seller = seller;

        return this.tourRepository.save(tour);
    }

    findById(id: number): Promise<Tour> {
        return this.tourRepository.findOne({ where: {id} });
    }

    async updateHoliday(id: number, updateTourHolidayDto: UpdateTourHolidayDto): Promise<Tour> {
        const tour = await this.findById(id);
        if (!tour) {
            throw new BadRequestException('존재하지 않는 투어 상품입니다.');
        }

        tour.holidayDate = updateTourHolidayDto.holidayDate;
        tour.holidayDay = updateTourHolidayDto.holidayDay;
        tour.holidayIsRepeat = updateTourHolidayDto.holidayIsRepeat;
        
        return this.tourRepository.save(tour);
    }
}

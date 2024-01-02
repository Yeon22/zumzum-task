import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TOUR_STATE, Tour } from './entity/tour.entity';
import { CreateTourDto, UpdateTourHolidayDto } from './dto/tour.dto';

@Injectable()
export class TourService {
    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>
    ) {}

    async create(createTourDto: CreateTourDto): Promise<Tour> {
        const tour = new Tour();
        tour.title = createTourDto.title;
        tour.description = createTourDto.description;
        tour.tour_period = createTourDto.tour_period;
        tour.location = createTourDto.location;
        tour.seller = createTourDto.seller;

        return this.tourRepository.save(tour);
    }

    findById(id: number): Promise<Tour> {
        return this.tourRepository.findOne({ where: {id}, relations: {seller: true} });
    }

    /**
     * @todo 예약이 없는 기간의 투어 상품 조회
     * @param month 
     */
    // findsAvailable(month: number): Promise<Tour[]> {
        
    // }

    async updateHoliday(updateTourHolidayDto: UpdateTourHolidayDto): Promise<Tour> {
        const {tour} = updateTourHolidayDto;

        tour.holidayDate = updateTourHolidayDto.holidayDate;
        tour.holidayDay = updateTourHolidayDto.holidayDay;
        tour.holidayIsRepeat = updateTourHolidayDto.holidayIsRepeat;
        
        return this.tourRepository.save(tour);
    }
}

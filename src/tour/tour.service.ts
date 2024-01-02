import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { Repository } from 'typeorm';
import { Tour } from './entity/tour.entity';
import { CreateTourDto, UpdateTourHolidayDto } from './dto/tour.dto';

@Injectable()
export class TourService {
    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,
        @Inject(CACHE_MANAGER)
        private readonly cacheService: Cache,
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

    async updateHoliday(updateTourHolidayDto: UpdateTourHolidayDto): Promise<Tour> {
        const {tour} = updateTourHolidayDto;

        tour.holidayDate = updateTourHolidayDto.holidayDate;
        tour.holidayDay = updateTourHolidayDto.holidayDay;
        tour.holidayIsRepeat = updateTourHolidayDto.holidayIsRepeat;

        await this.cacheService.del('booking-month-available');
        
        return this.tourRepository.save(tour);
    }
}

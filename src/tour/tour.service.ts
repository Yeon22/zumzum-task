import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entity/tour.entity';
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

    async updateHoliday(updateTourHolidayDto: UpdateTourHolidayDto): Promise<Tour> {
        const {tour} = updateTourHolidayDto;

        tour.holidayDate = updateTourHolidayDto.holidayDate;
        tour.holidayDay = updateTourHolidayDto.holidayDay;
        tour.holidayIsRepeat = updateTourHolidayDto.holidayIsRepeat;
        
        return this.tourRepository.save(tour);
    }
}

import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/tour.dto';
import { Tour } from './entity/tour.entity';

@Controller('tour')
export class TourController {
    constructor(
        private readonly tourService: TourService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createTourDto: CreateTourDto): Promise<Tour> {
        return this.tourService.create(createTourDto);
    }
}

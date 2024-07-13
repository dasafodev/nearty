import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { NearbySearchDto } from './dto/nearby-search.dto';
import { PlacesService } from './places.service';

@ApiTags('Places')
@ApiBearerAuth()
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find nearby places' })
  @ApiResponse({
    status: 200,
    description: 'List of nearby places',
    schema: {
      example: {
        places: [
          {
            name: 'Place 1',
            rating: 4.5,
            user_ratings_total: 100,
            vicinity: '123 Main St',
            place_id: 'abc123',
          },
        ],
        nextPageToken: 'next_page_token',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Latitude and longitude are required',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async nearbySearch(
    @Query(new ValidationPipe({ transform: true })) query: NearbySearchDto,
  ) {
    const { latitude, longitude, radius, type, pagetoken } = query;

    if (!latitude || !longitude) {
      throw new BadRequestException('Latitude and longitude are required');
    }

    const latitudeNumber = parseFloat(latitude);
    const longitudeNumber = parseFloat(longitude);
    const radiusNumber = radius ? parseInt(radius, 10) : undefined;

    return this.placesService.nearbySearch(
      latitudeNumber,
      longitudeNumber,
      radiusNumber,
      type,
      pagetoken,
    );
  }
}

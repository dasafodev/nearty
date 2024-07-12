import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  async nearbySearch(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius?: string,
    @Query('type') type?: string,
    @Query('pagetoken') pageToken?: string,
  ) {
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
      pageToken,
    );
  }
}

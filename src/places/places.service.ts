import { Client } from '@googlemaps/google-maps-services-js';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  private readonly googleMapsClient: Client;

  constructor(private readonly configService: ConfigService) {
    this.googleMapsClient = new Client();
  }

  async nearbySearch(
    latitude: number,
    longitude: number,
    radius: number = 1500,
    type: string = 'restaurant',
    pageToken?: string,
  ): Promise<{ places: Place[]; nextPageToken?: string }> {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    const location = `${latitude},${longitude}`;
    const params: any = {
      location,
      radius,
      type,
      key: apiKey,
    };
    if (pageToken) {
      params.pagetoken = pageToken;
    }
    try {
      const response = await this.googleMapsClient.placesNearby({
        params,
      });
      const data = response.data;
      const places: Place[] = data.results.map((result) => ({
        name: result.name,
        rating: result.rating,
        user_ratings_total: result.user_ratings_total,
        vicinity: result.vicinity,
        place_id: result.place_id,
      }));

      return {
        nextPageToken: data.next_page_token,
        places,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching nearby places');
    }
  }
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class NearbySearchDto {
  @IsNumberString()
  @ApiPropertyOptional({
    description: 'Latitude of the location',
    example: '40.748817',
  })
  latitude: string;

  @IsNumberString()
  @ApiPropertyOptional({
    description: 'Longitude of the location',
    example: '-73.985428',
  })
  longitude: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ description: 'Radius in meters', example: '1500' })
  radius?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Type of place (e.g., restaurant, cafe)',
    example: 'restaurant',
  })
  type?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Page token for pagination',
  })
  pagetoken?: string;
}

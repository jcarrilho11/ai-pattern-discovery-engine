import { IsArray, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzePatternsDto {
  @ApiProperty({
    description: 'Array of data records with numeric fields',
    example: [
      { revenue: 125000, customers: 450, churnRate: 12.5, satisfaction: 4.2 },
      { revenue: 89000, customers: 320, churnRate: 18.3, satisfaction: 3.8 },
    ],
  })
  @IsArray()
  data: Record<string, any>[];

  @ApiProperty({
    description: 'Number of clusters for K-Means algorithm',
    minimum: 1,
    maximum: 20,
    default: 3,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  clusters?: number;
}

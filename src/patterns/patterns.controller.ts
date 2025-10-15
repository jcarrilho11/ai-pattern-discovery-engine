import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatternsService, PatternAnalysisResult } from './patterns.service';
import { AnalyzePatternsDto } from './dto/analyze-patterns.dto';

@ApiTags('patterns')
@Controller('patterns')
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Analyze dataset patterns' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pattern analysis completed successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async analyzePatterns(
    @Body() dto: AnalyzePatternsDto,
  ): Promise<PatternAnalysisResult> {
    const clusterCount = dto.clusters ?? 3;
    return this.patternsService.analyzePatterns(dto.data, clusterCount);
  }
}

import { Module } from '@nestjs/common';
import { PatternsController } from './patterns.controller';
import { PatternsService } from './patterns.service';
import { AiService } from '../ai/ai.service';

@Module({
  controllers: [PatternsController],
  providers: [PatternsService, AiService],
})
export class PatternsModule {}

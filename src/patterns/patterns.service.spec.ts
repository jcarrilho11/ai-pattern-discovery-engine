import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { AiService } from '../ai/ai.service';

describe('PatternsService', () => {
  let service: PatternsService;
  let aiService: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatternsService,
        {
          provide: AiService,
          useValue: {
            generateInsight: jest.fn().mockResolvedValue('Test insight'),
          },
        },
      ],
    }).compile();

    service = module.get<PatternsService>(PatternsService);
    aiService = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzePatterns', () => {
    it('should throw error for empty dataset', async () => {
      await expect(service.analyzePatterns([], 3)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error for invalid cluster count', async () => {
      const data = [{ x: 1, y: 2 }];
      
      await expect(service.analyzePatterns(data, 0)).rejects.toThrow(
        BadRequestException,
      );
      
      await expect(service.analyzePatterns(data, 5)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error for non-numeric data', async () => {
      const data = [{ name: 'test' }, { name: 'test2' }];
      
      await expect(service.analyzePatterns(data, 2)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should analyze patterns successfully', async () => {
      const data = [
        { revenue: 100, customers: 50 },
        { revenue: 200, customers: 100 },
        { revenue: 150, customers: 75 },
      ];

      const result = await service.analyzePatterns(data, 2);

      expect(result.summary.totalRecords).toBe(3);
      expect(result.summary.numericFields).toEqual(['revenue', 'customers']);
      expect(result.statistics).toHaveLength(2);
      expect(result.clustering.clusters).toHaveLength(2);
      expect(result.aiInsight).toBe('Test insight');
      expect(aiService.generateInsight).toHaveBeenCalled();
    });
  });
});

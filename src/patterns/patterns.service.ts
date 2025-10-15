import { Injectable, BadRequestException } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import {
  calculateDatasetStatistics,
  FieldStatistics,
} from '../utils/statistics.util';
import {
  kMeans,
  recordsToPoints,
  KMeansResult,
} from '../utils/kmeans.util';

export interface PatternAnalysisResult {
  summary: {
    totalRecords: number;
    numericFields: string[];
    clusterCount: number;
  };
  statistics: FieldStatistics[];
  clustering: {
    clusters: Array<{
      clusterIndex: number;
      size: number;
      percentage: number;
      centroid: number[];
    }>;
    iterations: number;
  };
  aiInsight: string;
}

@Injectable()
export class PatternsService {
  constructor(private readonly aiService: AiService) {}

  async analyzePatterns(
    data: Record<string, any>[],
    clusterCount: number = 3,
  ): Promise<PatternAnalysisResult> {
    if (!data || data.length === 0) {
      throw new BadRequestException('Dataset cannot be empty');
    }

    if (clusterCount < 1 || clusterCount > data.length) {
      throw new BadRequestException(
        `Cluster count must be between 1 and ${data.length}`,
      );
    }


    const statistics = calculateDatasetStatistics(data);

    if (statistics.length === 0) {
      throw new BadRequestException('No numeric fields found in dataset');
    }


    const { points, fields } = recordsToPoints(data);
    const kmeansResult: KMeansResult = kMeans(points, clusterCount);

    const aiInsight = await this.aiService.generateInsight(
      data,
      statistics,
      kmeansResult.clusters,
    );


    return {
      summary: {
        totalRecords: data.length,
        numericFields: fields,
        clusterCount: kmeansResult.clusters.length,
      },
      statistics,
      clustering: {
        clusters: kmeansResult.clusters.map(cluster => ({
          clusterIndex: cluster.clusterIndex,
          size: cluster.points.length,
          percentage: parseFloat(
            ((cluster.points.length / data.length) * 100).toFixed(2),
          ),
          centroid: cluster.centroid.map(v => parseFloat(v.toFixed(4))),
        })),
        iterations: kmeansResult.iterations,
      },
      aiInsight,
    };
  }
}

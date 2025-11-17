# AI Pattern Discovery Engine

A simple API that finds patterns in your data and explains them in plain English.

## What it does

Give it a dataset with numbers (like sales data, customer metrics, etc.) and it will:

1. Calculate basic statistics
2. Group similar records together
3. Explain what the patterns mean

Built with NestJS and includes proper validation, tests and Docker setup.

## Quick Start

```bash
# Setup
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Run
npm run start:dev

# Or with Docker
docker-compose up
```

## API

**Documentation:** `http://localhost:3000/api`

### `POST /patterns`

**Request:**
```json
{
  "data": [
    { "revenue": 125000, "customers": 450, "churnRate": 12.5, "satisfaction": 4.2 },
    { "revenue": 89000, "customers": 320, "churnRate": 18.3, "satisfaction": 3.8 },
    { "revenue": 210000, "customers": 780, "churnRate": 8.1, "satisfaction": 4.7 }
  ],
  "clusters": 3
}
```

**Response:**

```json
{
  "summary": {
    "totalRecords": 12,
    "numericFields": ["revenue", "customers", "churnRate", "satisfaction"],
    "clusterCount": 3
  },
  "statistics": [
    { "field": "revenue", "mean": 144583.33, "min": 87000, "max": 210000, "stdDev": 42156.78 },
    { "field": "customers", "mean": 527.5, "min": 310, "max": 780, "stdDev": 156.23 },
    { "field": "churnRate", "mean": 12.4, "min": 8.1, "max": 19.2, "stdDev": 3.8 },
    { "field": "satisfaction", "mean": 4.26, "min": 3.7, "max": 4.7, "stdDev": 0.32 }
  ],
  "clustering": {
    "clusters": [
      { "clusterIndex": 0, "size": 4, "percentage": 33.33, "centroid": [202750, 737.5, 8.65, 4.6] },
      { "clusterIndex": 1, "size": 5, "percentage": 41.67, "centroid": [134200, 482, 11.76, 4.26] },
      { "clusterIndex": 2, "size": 3, "percentage": 25.0, "centroid": [89333, 323.33, 18.07, 3.8] }
    ],
    "iterations": 4
  },
  "aiInsight": "Analysis reveals three distinct business segments: high-performers with strong revenue and low churn, a stable mid-tier group and struggling accounts with elevated churn rates. The strong correlation between customer satisfaction and churn suggests focusing retention efforts on the at-risk segment could yield significant ROI."
}
```

### `GET /health`

Health check endpoint for monitoring.

**Try it:**
```bash
curl -X POST http://localhost:3000/patterns \
  -H "Content-Type: application/json" \
  -d @example-request.json
```

## Try it out

1. Start: `npm run start:dev`
2. Open: `http://localhost:3000/api`
3. Use the example data from `example-request.json`
4. Check the response: stats, clusters and AI explanation

## Architecture

```
src/
├── ai/
│   └── ai.service.ts              # LangChain + OpenAI integration
├── patterns/
│   ├── dto/
│   │   └── analyze-patterns.dto.ts    # Request validation with class-validator
│   ├── patterns.controller.ts         # REST endpoint
│   ├── patterns.service.ts            # Business logic
│   └── patterns.module.ts
├── utils/
│   ├── statistics.util.ts         # Descriptive statistics
│   └── kmeans.util.ts             # K-Means implementation
├── app.module.ts
└── main.ts                        # Bootstrap with global validation
```

## How it works

**Stats:** Calculates mean, min, max, standard deviation for numeric fields

**Clustering:** Groups similar records using K-Means

**AI Insights:** Uses OpenAI to explain patterns in simple language

**Production ready:** Includes validation, tests, rate limiting, health checks and Docker

## Built with

- NestJS + TypeScript
- OpenAI + LangChain
- Docker
- Jest for testing

## Development

```bash
npm run start:dev    # Dev mode
npm test             # Run tests
npm run build        # Build
```

## Testing

20 unit tests covering stats, clustering and validation:

```bash
npm test
```

## Use cases

- Customer segmentation
- Finding outliers in business data
- Understanding metric relationships
- Getting plain-English explanations of data patterns

## Why I built this

Wanted to learn how to:
- Implement ML algorithms from scratch
- Integrate AI into backend services
- Build APIs with testing and docs

## Known limitations

- No feature scaling (large numbers dominate clustering)
- Results vary between runs (random initialization)
- Assumes all fields are numeric
- Simple demo scope: not production ML

Next steps: better initialization, data validation and scaling normalization.


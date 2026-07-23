from typing import List, Optional
from pydantic import BaseModel


class MetricOverview(BaseModel):
    total_projected_revenue: float
    closed_won_revenue: float
    total_deals_count: int
    win_rate_percentage: float
    avg_deal_size: float
    avg_sales_cycle_days: int


class StageDistributionItem(BaseModel):
    stage: str
    count: int
    total_value: float


class MonthlyForecastItem(BaseModel):
    month: str
    won_amount: float
    pipeline_amount: float


class RepPerformanceItem(BaseModel):
    rep_name: str
    deals_count: int
    total_won_value: float
    conversion_rate: float


class ReportAnalyticsResponse(BaseModel):
    overview: MetricOverview
    stage_distribution: List[StageDistributionItem]
    monthly_forecast: List[MonthlyForecastItem]
    rep_performance: List[RepPerformanceItem]
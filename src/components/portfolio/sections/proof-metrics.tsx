import type { ProofMetric } from '@/content/portfolio/types'

type ProofMetricsProps = {
  metrics: ProofMetric[]
}

export function ProofMetrics({ metrics }: ProofMetricsProps) {
  return (
    <ul className="portfolio-metric-list" role="list">
      {metrics.map((metric) => (
        <li className="portfolio-card" key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </li>
      ))}
    </ul>
  )
}

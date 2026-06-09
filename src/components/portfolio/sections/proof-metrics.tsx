import type { HomeContent } from '@/content/portfolio/home'

export function ProofMetrics({ metrics }: { metrics: HomeContent['metrics'] }) {
  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={
              'border-border px-6 py-10 ' +
              (index > 0 ? 'border-t sm:border-l sm:border-t-0' : '')
            }
          >
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{metric.value}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

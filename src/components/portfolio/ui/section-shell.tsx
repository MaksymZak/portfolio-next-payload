import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionShellProps = ComponentPropsWithoutRef<'section'> & {
  eyebrow?: string
  title: string
  intro?: string
  children?: ReactNode
}

export function SectionShell({
  eyebrow,
  title,
  intro,
  children,
  className,
  ...rest
}: SectionShellProps) {
  const sectionClassName = ['portfolio-section', className].filter(Boolean).join(' ')

  return (
    <section className={sectionClassName} {...rest}>
      <header className="portfolio-section__header">
        {eyebrow ? <p className="portfolio-section__eyebrow">{eyebrow}</p> : null}
        <h2 className="portfolio-section__title">{title}</h2>
        {intro ? <p className="portfolio-section__intro">{intro}</p> : null}
      </header>
      {children}
    </section>
  )
}

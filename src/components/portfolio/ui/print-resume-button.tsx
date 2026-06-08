'use client'

type PrintResumeButtonProps = {
  label: string
}

export function PrintResumeButton({ label }: PrintResumeButtonProps) {
  return (
    <button
      className="portfolio-button portfolio-button--primary screen-only print:hidden"
      data-testid="print-resume-button"
      onClick={() => window.print()}
      type="button"
    >
      {label}
    </button>
  )
}

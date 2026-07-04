import { MonitorDot } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { env } from '@/config/env'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import type { Experience, Resume, Skill } from '@/payload-types'

export type ResumeBentoProps = {
  resume: Resume
  skills: Skill[]
  experience: Experience[]
  className?: string
}

/**
 * A4 sheet caps — the printed CV drops whole items past these limits (never
 * mid-sentence truncation); the live page always shows everything. Row heights
 * in the `sheet:` classes below are budgeted to exactly fill one A4 page:
 * 160 (header) + 310 + 410 + 147 (rows) + 3×12 (gaps) = 1063px of printable
 * height. Admin ordering decides what makes the cut.
 */
const SHEET_MAX_JOBS = 3
const SHEET_MAX_BULLETS_PER_JOB = 4
const SHEET_MAX_EDUCATION = 1

type ResumeSectionHeadingProps = {
  index: number
  children: ReactNode
  className?: string
}

function ResumeSectionHeading({ index, children, className }: ResumeSectionHeadingProps) {
  const formatted = `[${String(index).padStart(2, '0')}]`

  return (
    <h2
      className={cn(
        'mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground sheet:mb-2 sheet:text-gray-500',
        className,
      )}
    >
      <span className="inline-block size-1.5 bg-primary sheet:bg-black" aria-hidden />
      <span>{formatted}</span>
      <span>{children}</span>
    </h2>
  )
}

export async function ResumeBento({ resume, skills, experience, className }: ResumeBentoProps) {
  const tResume = await getTranslations('resume')
  const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sheet:grid-cols-3 sheet:gap-3 sheet:text-black md:grid-cols-3',
        className,
      )}
    >
      <section className="flex flex-col justify-center border-2 border-border p-6 sheet:col-span-2 sheet:h-[310px] sheet:overflow-hidden sheet:border-gray-300 sheet:p-5 sm:p-8 md:col-span-2">
        <ResumeSectionHeading index={1}>{tResume('sections.about')}</ResumeSectionHeading>
        <p className="text-sm leading-relaxed sheet:line-clamp-8 sheet:text-[12px] sheet:leading-relaxed sheet:text-black md:text-base">
          {resume.about.text}
        </p>
      </section>

      <section className="border-2 border-border bg-surface-muted p-6 sheet:h-[310px] sheet:overflow-hidden sheet:border-gray-300 sheet:bg-gray-50 sheet:p-4 sm:p-8">
        <ResumeSectionHeading index={2}>{tResume('sections.stack')}</ResumeSectionHeading>
        <div className="flex flex-wrap gap-2 sheet:gap-1">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="surface"
              size="sm"
              className="gap-1.5 border-border px-2.5 py-1.5 sheet:border-gray-300 sheet:bg-white sheet:px-1.5 sheet:py-0.5 sheet:text-[9px] sheet:text-black"
            >
              <span>{skill.title}</span>
            </Badge>
          ))}
        </div>
      </section>

      <section className="border-2 border-border p-6 sheet:col-span-2 sheet:h-[410px] sheet:overflow-hidden sheet:border-gray-300 sheet:p-5 sm:p-8 md:col-span-2">
        <ResumeSectionHeading index={3} className="sheet:mb-3">
          {tResume('sections.experience')}
        </ResumeSectionHeading>

        <div className="space-y-6 sheet:space-y-4">
          {experience.map((job, jobIndex) => {
            const isCurrent = jobIndex === 0

            return (
              <div
                key={job.id}
                className={cn(
                  'relative space-y-3 border-l-2 pb-2 pl-6 sheet:space-y-2 sheet:pb-0 sheet:pl-6 sm:pl-8',
                  isCurrent ? 'border-foreground sheet:border-black' : 'border-border sheet:border-gray-300',
                  jobIndex >= SHEET_MAX_JOBS && 'sheet:hidden',
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute top-1 -left-[5px] size-2 rounded-none border-[1.5px] bg-background sheet:bg-white',
                    isCurrent ? 'border-foreground sheet:border-black' : 'border-border sheet:border-gray-400',
                  )}
                />

                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold tracking-tight text-foreground uppercase sheet:text-[13px] sheet:text-black">
                      {job.role}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] font-bold tracking-wider text-foreground sheet:text-black">
                      {job.company}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-block self-start px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase',
                      isCurrent
                        ? 'border border-border bg-surface text-primary sheet:border-none sheet:bg-transparent sheet:p-0 sheet:text-black'
                        : 'text-muted-foreground sheet:p-0 sheet:text-gray-500',
                    )}
                  >
                    {job.period}
                  </span>
                </div>

                {job.bullets?.length ? (
                  <ul className="mt-2 space-y-1.5 sheet:mt-2 sheet:space-y-1.5">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bullet.id ?? bullet.text}
                        className={cn(
                          'flex gap-2 text-xs leading-relaxed text-muted-foreground sheet:text-[11px] sheet:leading-normal sheet:text-gray-800',
                          bulletIndex >= SHEET_MAX_BULLETS_PER_JOB && 'sheet:hidden',
                        )}
                      >
                        <span
                          className={cn(
                            'select-none',
                            isCurrent
                              ? 'font-mono text-primary sheet:text-black'
                              : 'text-muted-foreground sheet:text-gray-500',
                          )}
                          aria-hidden
                        >
                          {isCurrent ? '→' : '·'}
                        </span>
                        <span>{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-8 border-2 border-border p-6 sheet:h-[410px] sheet:gap-6 sheet:overflow-hidden sheet:border-gray-300 sheet:p-5 sm:p-8">
        {resume.softSkills?.length ? (
          <div>
            <ResumeSectionHeading index={4}>{tResume('sections.softSkills')}</ResumeSectionHeading>
            <ul className="mt-3 grid grid-cols-1 gap-3 font-mono text-[10px] font-bold text-foreground uppercase sheet:mt-2 sheet:gap-2 sheet:text-black">
              {resume.softSkills.map((skill, index) => (
                <li key={skill.id ?? skill.text} className="flex items-center gap-3">
                  <span className="w-3 tracking-tighter text-muted-foreground opacity-60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 border-b border-dotted border-border pb-1 sheet:border-gray-300">
                    {skill.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {resume.languages?.length ? (
          <div>
            <ResumeSectionHeading index={5}>{tResume('sections.languages')}</ResumeSectionHeading>
            <ul className="mt-2 space-y-2 font-mono text-[10px] font-bold text-foreground uppercase sheet:space-y-2 sheet:text-black">
              {resume.languages.map((language) => (
                <li
                  key={language.id ?? `${language.name}-${language.level}`}
                  className="flex items-baseline justify-between gap-3 border-b border-border pb-2 sheet:border-gray-200 sheet:pb-1.5"
                >
                  <span className="shrink-0">{language.name}</span>
                  <span
                    className={cn(
                      'text-right',
                      (language.level ?? '').toLowerCase().includes('native') ||
                        (language.level ?? '').toLowerCase().includes('рідн')
                        ? 'text-primary sheet:text-black'
                        : 'text-muted-foreground',
                    )}
                  >
                    {language.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="grid grid-cols-1 gap-6 sheet:col-span-3 sheet:grid-cols-2 sheet:break-inside-avoid sheet:gap-3 md:col-span-3 md:grid-cols-2">
        {resume.education?.length ? (
          <div className="border-2 border-border bg-surface-muted p-6 sheet:h-[147px] sheet:overflow-hidden sheet:border-gray-300 sheet:bg-gray-50 sheet:p-4 sm:p-8">
            <ResumeSectionHeading index={6}>{tResume('sections.education')}</ResumeSectionHeading>
            <div className="space-y-5 sheet:space-y-3">
              {resume.education.map((item, itemIndex) => (
                <div
                  key={item.id ?? `${item.title}-${item.date}`}
                  className={cn(itemIndex >= SHEET_MAX_EDUCATION && 'sheet:hidden')}
                >
                  <h3 className="mb-1 text-sm font-extrabold tracking-tight text-foreground uppercase sheet:text-[13px] sheet:text-black">
                    {item.title}
                  </h3>
                  <div className="mb-3 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase sheet:mb-2 sheet:text-gray-500">
                    {item.date}
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground sheet:line-clamp-2 sheet:text-[11px] sheet:leading-normal sheet:text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col justify-between border-2 border-foreground bg-foreground p-6 text-background sheet:h-[147px] sheet:overflow-hidden sheet:border-black sheet:bg-black sheet:p-4 sheet:text-white sm:p-8">
          <div>
            <ResumeSectionHeading index={7} className="text-muted-foreground sheet:text-gray-300">
              {tResume('sections.portfolio')}
            </ResumeSectionHeading>
            <h3 className="mb-2 text-sm font-extrabold tracking-tight uppercase sheet:mb-2 sheet:text-[13px] sm:text-base">
              {resume.portfolioNote.title}
            </h3>
            <p className="text-xs text-muted-foreground sheet:line-clamp-2 sheet:text-[11px] sheet:leading-normal sheet:text-gray-300">
              {resume.portfolioNote.text}
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-2 bg-background py-3 font-mono text-[10px] font-bold text-foreground uppercase motion-safe:transition-colors hover:bg-primary hover:text-primary-foreground sheet:hidden"
          >
            <MonitorDot size={14} aria-hidden />
            {tResume('viewLivePortfolio')}
          </Link>

          <div className="mt-6 hidden border-t border-gray-600 pt-4 font-mono text-[10px] font-bold tracking-widest sheet:mt-2 sheet:block sheet:pt-2">
            {tResume('printVisit', { url: siteUrl.toUpperCase() })}
          </div>
        </div>
      </section>
    </div>
  )
}

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
        'mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground print:mb-2 print:text-gray-500',
        className,
      )}
    >
      <span className="inline-block size-1.5 bg-primary print:bg-black" aria-hidden />
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
        'grid grid-cols-1 gap-6 print:gap-3 print:text-black md:grid-cols-3',
        className,
      )}
    >
      <section className="flex flex-col justify-center border-2 border-border p-6 sm:p-8 md:col-span-2 print:border-gray-300 print:p-4">
        <ResumeSectionHeading index={1}>{tResume('sections.about')}</ResumeSectionHeading>
        <p className="text-sm leading-relaxed md:text-base print:text-xs print:text-black">
          {resume.about.text}
        </p>
      </section>

      <section className="border-2 border-border bg-surface-muted p-6 sm:p-8 print:border-gray-300 print:bg-gray-50 print:p-4">
        <ResumeSectionHeading index={2}>{tResume('sections.stack')}</ResumeSectionHeading>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="surface"
              size="sm"
              className="border-border print:border-gray-300 print:bg-white print:text-black motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-150 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground motion-safe:hover:shadow-[3px_3px_0px_var(--foreground)]"
            >
              {skill.title}
            </Badge>
          ))}
        </div>
      </section>

      <section className="border-2 border-border p-6 sm:p-8 md:col-span-2 print:border-gray-300 print:p-4">
        <ResumeSectionHeading index={3} className="print:mb-4">
          {tResume('sections.experience')}
        </ResumeSectionHeading>

        <div className="space-y-6 print:space-y-4">
          {experience.map((job, jobIndex) => {
            const isCurrent = jobIndex === 0

            return (
              <div
                key={job.id}
                className={cn(
                  'relative space-y-3 border-l-2 pb-2 pl-6 sm:pl-8',
                  isCurrent ? 'border-foreground print:border-black' : 'border-border print:border-gray-300',
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute top-1 -left-[5px] size-2 rounded-none border-[1.5px] bg-background print:bg-white',
                    isCurrent ? 'border-foreground print:border-black' : 'border-border print:border-gray-400',
                  )}
                />

                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold tracking-tight text-foreground uppercase print:text-black">
                      {job.role}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] font-bold tracking-wider text-foreground print:text-black">
                      {job.company}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-block self-start px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase',
                      isCurrent
                        ? 'border border-border bg-surface text-primary print:border-none print:bg-transparent print:text-black'
                        : 'text-muted-foreground print:text-gray-500',
                    )}
                  >
                    {job.period}
                  </span>
                </div>

                {job.bullets?.length ? (
                  <ul className="mt-2 space-y-1.5 print:space-y-1">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet.id ?? bullet.text}
                        className="flex gap-2 text-xs leading-relaxed text-muted-foreground print:text-[11px] print:text-gray-800"
                      >
                        <span
                          className={cn(
                            'select-none',
                            isCurrent
                              ? 'font-mono text-primary print:text-black'
                              : 'text-muted-foreground print:text-gray-500',
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

      <section className="flex flex-col gap-8 border-2 border-border p-6 sm:p-8 print:gap-5 print:border-gray-300 print:p-4">
        {resume.softSkills?.length ? (
          <div>
            <ResumeSectionHeading index={4}>{tResume('sections.softSkills')}</ResumeSectionHeading>
            <ul className="mt-3 grid grid-cols-1 gap-3 font-mono text-[10px] font-bold text-foreground uppercase print:gap-2 print:text-black">
              {resume.softSkills.map((skill, index) => (
                <li key={skill.id ?? skill.text} className="flex items-center gap-3">
                  <span className="w-3 tracking-tighter text-muted-foreground opacity-60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 border-b border-dotted border-border pb-1 print:border-gray-300">
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
            <ul className="mt-2 space-y-2 font-mono text-[10px] font-bold text-foreground uppercase print:space-y-1 print:text-black">
              {resume.languages.map((language) => (
                <li
                  key={language.id ?? `${language.name}-${language.level}`}
                  className="flex justify-between border-b border-border pb-2 print:border-gray-200"
                >
                  <span>{language.name}</span>
                  <span
                    className={cn(
                      (language.level ?? '').toLowerCase().includes('native') ||
                        (language.level ?? '').toLowerCase().includes('рідн')
                        ? 'text-primary print:text-black'
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

      <section className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2 print:gap-3">
        {resume.education?.length ? (
          <div className="border-2 border-border bg-surface-muted p-6 sm:p-8 print:border-gray-300 print:bg-gray-50 print:p-4">
            <ResumeSectionHeading index={6}>{tResume('sections.education')}</ResumeSectionHeading>
            <div className="space-y-5 print:space-y-3">
              {resume.education.map((item) => (
                <div key={item.id ?? `${item.title}-${item.date}`}>
                  <h3 className="mb-1 text-sm font-extrabold tracking-tight text-foreground uppercase print:text-black">
                    {item.title}
                  </h3>
                  <div className="mb-3 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase print:text-gray-500">
                    {item.date}
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground print:text-[11px] print:text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col justify-between border-2 border-foreground bg-foreground p-6 text-background sm:p-8 print:border-black print:bg-black print:p-4 print:text-white">
          <div>
            <ResumeSectionHeading index={7} className="text-muted-foreground print:text-gray-300">
              {tResume('sections.portfolio')}
            </ResumeSectionHeading>
            <h3 className="mb-2 text-sm font-extrabold tracking-tight uppercase sm:text-base print:text-sm">
              {resume.portfolioNote.title}
            </h3>
            <p className="text-xs text-muted-foreground print:text-[11px] print:text-gray-300">
              {resume.portfolioNote.text}
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-2 bg-background py-3 font-mono text-[10px] font-bold text-foreground uppercase motion-safe:transition-colors hover:bg-primary hover:text-primary-foreground print:hidden"
          >
            <MonitorDot size={14} aria-hidden />
            {tResume('viewLivePortfolio')}
          </Link>

          <div className="mt-6 hidden border-t border-gray-600 pt-4 font-mono text-[10px] font-bold tracking-widest print:block">
            {tResume('printVisit', { url: siteUrl.toUpperCase() })}
          </div>
        </div>
      </section>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Bot,
  Code2,
  Cpu,
  CreditCard,
  Database,
  Layers,
  Palette,
  Plug,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react'

const SKILL_ICON_MAP: Record<string, LucideIcon> = {
  html: Code2,
  css: Palette,
  'html & css': Palette,
  'javascript / typescript': Shield,
  javascript: Code2,
  typescript: Shield,
  tailwind: Palette,
  'tailwind css': Palette,
  react: Cpu,
  'next.js': Code2,
  astro: Sparkles,
  'payload cms': Database,
  'redux & zustand': Activity,
  redux: Activity,
  zustand: Activity,
  gsap: Sparkles,
  'framer motion': Sparkles,
  'tanstack query': Layers,
  gulp: Terminal,
  vercel: Terminal,
  'node.js': Terminal,
  'express.js': Terminal,
  'postgresql & mongodb': Database,
  postgresql: Database,
  mongodb: Database,
  'mongoose & prisma orm': Layers,
  prisma: Layers,
  'drizzle orm': Layers,
  zod: Shield,
  stripe: CreditCard,
  docker: Shield,
  'claude code': Bot,
  cursor: Bot,
  codex: Bot,
  mcp: Plug,
}

const warnedUnknownSkills = new Set<string>()

function normalizeSkillTitle(title: string) {
  return title.trim().toLowerCase()
}

/** Maps a skill title to a Lucide icon; falls back to Code2 for unknown titles. */
export function getSkillIcon(title: string): LucideIcon {
  const key = normalizeSkillTitle(title)
  const icon = SKILL_ICON_MAP[key]

  if (!icon && process.env.NODE_ENV === 'development' && !warnedUnknownSkills.has(key)) {
    warnedUnknownSkills.add(key)
    console.warn(`[stack] No icon mapping for skill "${title}"; using default Code2 icon.`)
  }

  return icon ?? Code2
}

export function splitPosition(position: string): { role: string; company: string } {
  const [role, company] = position.split(' — ')
  return { role: role?.trim() ?? position, company: company?.trim() ?? '' }
}

export function splitLanguage(entry: string): { name: string; level: string } {
  const [name, level] = entry.split(' - ')
  return { name: name?.trim() ?? entry, level: level?.trim() ?? '' }
}

export function countSkillLevel(levels: boolean[]) {
  return levels.filter(Boolean).length
}

export function mapContactType(icon: string) {
  const allowed = ['phone', 'mail', 'telegram', 'github', 'linkedin', 'map'] as const
  return allowed.includes(icon as (typeof allowed)[number])
    ? (icon as (typeof allowed)[number])
    : 'mail'
}

type CoreSkillsProps = {
  title: string
  skills: string[]
}

export function CoreSkills({ title, skills }: CoreSkillsProps) {
  return (
    <section className="portfolio-section" data-testid="core-skills">
      <div className="portfolio-section__header">
        <h2 className="portfolio-section__title portfolio-section__title--compact">{title}</h2>
      </div>
      <ul className="portfolio-inline-list" role="list">
        {skills.map((skill) => (
          <li className="portfolio-chip" key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

# Stitch Prompt Workflow

Дата: 2026-06-01

## 1. Purpose

This file contains a ready-to-use workflow for creating the visual direction of the portfolio in Stitch.

Goal:

- get 2-3 visual concepts first;
- choose the strongest direction;
- refine layout, typography, sections, and responsive behavior;
- prepare a clear visual base before writing the final `portfolio-mvp` spec.

Do not ask Stitch to build the final project immediately. Use it as a design exploration tool.

## 2. Important Design Requirements

Use these requirements in every Stitch prompt.

```text
Design mobile-first and then adapt to tablet, laptop, desktop, and wide desktop.

Use Tailwind CSS-friendly thinking:
- mobile: default styles, below 640px
- sm: 640px and up
- md: 768px and up
- lg: 1024px and up
- xl: 1280px and up
- 2xl: 1536px and up

The design should be realistic to implement with Next.js, Tailwind CSS, and reusable React components.

Avoid layouts that require fragile absolute positioning, overly complex custom canvas effects, heavy 3D, or animation-heavy interactions.

Prioritize:
- responsive layout quality;
- readable typography;
- clear section hierarchy;
- recruiter-friendly scanning;
- polished frontend portfolio feeling;
- production-ready UI.
```

## 3. Stage 1 Prompt: Generate 3 Visual Directions

Use this first.

```text
I am creating a personal portfolio website for Maksym Zakaliuzhnyi.

Please create 3 different visual directions for the portfolio. Do not build the final website yet. I want to compare design directions first.

Important:
- Design mobile-first and then adapt to desktop.
- Show both mobile and desktop thinking.
- Use Tailwind CSS-friendly responsive structure:
  - mobile: default styles, below 640px
  - sm: 640px and up
  - md: 768px and up
  - lg: 1024px and up
  - xl: 1280px and up
  - 2xl: 1536px and up
- The design should be realistic to implement with Next.js, Tailwind CSS, Payload CMS, and reusable React components.
- Avoid fragile layouts, excessive animation, decorative blobs, heavy gradients, generic SaaS styling, and heavy 3D.
- Prioritize strong typography, clean hierarchy, polished cards, recruiter-friendly scanning, and excellent mobile layout.

Hero photo strategy:
- Please explore hero options with and without a portrait.
- Recommended direction: do not make a large personal photo the main hero element.
- Prefer a small, professional portrait/avatar as a trust signal near the name, in the header, or inside a compact profile/status element.
- The main hero focus should stay on positioning, proof numbers, and CTAs.
- A larger photo can be considered for the resume page or contact section, but it should not make the homepage feel like a personal blog or influencer page.
- If using a background, make it abstract/editorial/technical and subtle, not a generic stock image.
- Avoid dark, blurred, atmospheric backgrounds that reduce readability.

Create 3 visual directions:

1. Clean Editorial Technical
   A refined editorial portfolio with strong typography, generous spacing, compact proof metrics, and elegant project previews.

2. Premium Product-Style Portfolio
   A polished frontend portfolio with product-like sections, structured cards, clear CTAs, and high-quality visual hierarchy.

3. Compact Recruiter-Focused Portfolio
   A denser, faster-scanning layout optimized for recruiters and hiring managers, while still looking modern and frontend-oriented.

For each direction, show or describe:
- homepage desktop layout;
- homepage mobile layout;
- hero section;
- selected commercial work section;
- featured project cards;
- experience section;
- skills section;
- resume CTA;
- contact section;
- color palette;
- typography direction;
- spacing/grid system;
- motion/interaction ideas.

Portfolio context:

Primary message:
"Reliable Middle Frontend / Next.js Developer for production landing systems and CMS-driven websites."

Secondary message:
"Frontend developer with backend integration experience and growing fullstack skills."

Audience:
- recruiters;
- hiring managers;
- frontend/team leads;
- small teams looking for a production-focused frontend developer.

The page should communicate within 10 seconds:
- Maksym is a commercial frontend developer, not a beginner;
- he has shipped and supported many production landing pages;
- he works with React, Next.js, TypeScript, Tailwind CSS, Payload CMS;
- he can handle CMS-driven websites and production support;
- he is available for remote work.

Visual style:
"Premium editorial technical portfolio."

The design should feel modern, polished, frontend-oriented, and professional. It should not look like a plain backend developer CV, but it should also not look like an overdesigned creative agency portfolio.

Key proof:
- 4+ years of commercial frontend experience;
- 300+ landing pages delivered or supported;
- React / Next.js / TypeScript;
- Tailwind CSS;
- Payload CMS / CMS-driven websites;
- remote work from Sumy, Ukraine.

Homepage sections:
1. Header with name, Work, Experience, Skills, Resume, Contact, EN/UK switch, Download CV button
2. Hero with strong positioning, short summary, proof numbers, and CTAs: View selected work, Download CV, Contact me
3. What I Do: Landing systems, Next.js interfaces, CMS-driven websites
4. Selected Commercial Work: compact cards for 6-8 public landing pages with live links and role tags
5. Featured Projects: Portfolio CMS and Commercial Landing Pages, with space for LMS Platform and Landing Version System later
6. Experience: GoITeens and SoftRyzen timeline
7. Skills grouped by category instead of self-rated bars
8. Engineering Approach: production-focused frontend, responsive layouts, CMS workflow awareness, performance, AI-assisted workflow with manual review
9. Resume CTA: View online resume and Download PDF
10. Contact section

MVP routes:
- /en
- /uk
- /en/resume
- /uk/resume

Stage 2 routes:
- /en/cases/commercial-landings
- /uk/cases/commercial-landings
- /en/projects/portfolio-cms
- /uk/projects/portfolio-cms
- /en/projects/lms-platform
- /uk/projects/lms-platform
- /en/projects/landing-version-system
- /uk/projects/landing-version-system

Candidate selected commercial work:
- Fast Reading: https://fast-reading.goiteens.com/
- NMT 2026: https://nmt.goiteens.com/nmt-2026/
- Painting: https://painting.goiteens.com/three-courses/
- Painting Tablet: https://painting-on-tablet.goiteens.com/v-1/
- AI Creator: https://ai-creator.goiteens.com/
- School Webinar: https://school-lp.goiteens.com/webinar-ai/
- Summer AI: https://summer-ai-courses.goiteens.com/
- Interior Design: https://interior-design.goiteens.com/
- Python: https://python.goiteens.com/

Resume page:
- Create a compact HTML resume concept.
- It should support a one-page PDF export later.
- It should include name, position, contacts, short summary, core skills, work experience, selected work/projects, education, languages, and link to live portfolio.
- Recommended position: "Middle Frontend / Next.js Developer".
```

## 4. Questions To Ask Yourself After Stage 1

After Stitch gives 3 directions, choose by these questions:

1. Which version makes me look like a stronger frontend developer?
2. Which version is easiest for a recruiter to scan in 30 seconds?
3. Which version best supports my proof: 4+ years, 300+ landings, Next.js, Payload CMS?
4. Which version is realistic to implement in Tailwind without fighting the layout?
5. Which version will still look good on mobile?
6. Which version does not look like a generic template?
7. Which hero treatment feels more professional: no photo, small portrait/avatar, or larger portrait?

Recommended choice criteria:

- choose clarity over wow-effect;
- choose good hierarchy over decoration;
- choose implementation realism over visual complexity;
- choose a design that can later support case pages.
- prefer a small portrait/avatar if it improves trust without distracting from the technical positioning.

## 4.1 Portrait Recommendation

My recommendation for this portfolio:

- use a small professional portrait/avatar, not a large hero portrait;
- keep the hero centered on positioning, proof metrics, and actions;
- use the portrait as a trust marker near the name, availability/status, contact block, or resume page;
- include a portrait on the resume page if the final CV layout has enough space;
- do not use a big cinematic photo background.

Reason:

The target signal is "reliable production frontend / Next.js developer", not personal brand influencer or designer portfolio. A small photo helps trust, but a large photo can steal attention from experience, proof, and selected work.

## 5. Stage 2 Prompt: Refine The Chosen Direction

Use this after choosing one direction.

```text
I choose direction [INSERT DIRECTION NAME].

Please refine this direction into a more concrete responsive layout system.

Focus on:
- mobile-first layout;
- desktop layout;
- Tailwind CSS breakpoints:
  - mobile below 640px
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- section spacing;
- max-width containers;
- grid behavior;
- card layout;
- typography scale;
- color palette;
- CTA hierarchy;
- navigation behavior;
- resume page layout;
- PDF-friendly resume constraints.

Please describe:
1. The layout behavior for each main section.
2. How each section changes from mobile to desktop.
3. Recommended typography sizes.
4. Recommended spacing scale.
5. Recommended Tailwind-style component patterns.
6. Suggested hover and motion behavior.
7. Any design risks I should avoid when implementing.

Keep the design realistic for a Next.js + Tailwind CSS implementation.
```

## 6. Stage 3 Prompt: Ask For Section-Level Details

Use this if a section is still unclear.

```text
Please refine only the [SECTION NAME] section.

Context:
- The portfolio is for a Middle Frontend / Next.js Developer.
- The visual direction is premium editorial technical.
- The implementation will use Next.js and Tailwind CSS.
- The section must work mobile-first and scale through Tailwind breakpoints.

Please provide:
- mobile layout;
- desktop layout;
- content hierarchy;
- card/component structure;
- typography suggestions;
- spacing suggestions;
- hover/motion ideas;
- implementation notes for Tailwind CSS.
```

Useful section names:

- Hero;
- What I Do;
- Selected Commercial Work;
- Featured Projects;
- Experience;
- Skills;
- Engineering Approach;
- Resume CTA;
- Contact;
- Resume Page.

## 7. Stage 4 Prompt: Prepare For Implementation

Use this after the visual direction is clear.

```text
Based on the chosen visual direction, summarize the design system for implementation.

Please provide:
- color tokens;
- typography scale;
- spacing scale;
- border radius rules;
- shadow/elevation rules;
- grid/container rules;
- button variants;
- card variants;
- section layout rules;
- mobile-first responsive rules;
- motion rules;
- accessibility notes;
- Tailwind CSS implementation notes.

Do not write the full code. I need a design system summary that can be converted into a technical specification.
```

## 8. What To Avoid Asking Stitch

Avoid:

```text
Create the whole website.
```

Avoid:

```text
Make it beautiful.
```

Avoid:

```text
Generate final production code.
```

Better:

```text
Create 3 visual directions first.
```

Better:

```text
Refine the chosen direction into a mobile-first responsive layout system.
```

Better:

```text
Summarize the design system so I can convert it into a Spec Kit specification.
```

## 9. How This Connects To Spec Kit

Stitch should answer:

- how the portfolio should look;
- what the visual hierarchy should be;
- how the layout behaves across breakpoints;
- what design system direction to use.

Spec Kit should answer:

- what exactly must be built;
- which routes exist;
- which sections exist;
- what data comes from Payload CMS;
- what remains static in code;
- how i18n works;
- how resume/PDF works;
- what the acceptance criteria are.

Recommended sequence:

1. Use Stage 1 prompt in Stitch.
2. Choose one visual direction.
3. Use Stage 2 prompt to refine it.
4. Use Stage 3 prompts only for unclear sections.
5. Use Stage 4 prompt to get design system notes.
6. Bring the result back into this project.
7. Convert it into `portfolio-mvp` Spec Kit requirements.

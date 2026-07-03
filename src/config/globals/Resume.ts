import type { GlobalConfig } from 'payload'

import { resumeRevalidateHooks } from '@/server/cache/revalidate'

export const Resume: GlobalConfig = {
  slug: 'resume',
  hooks: resumeRevalidateHooks,
  label: 'Resume',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'about',
      type: 'group',
      label: 'About',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'date',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Study period, e.g. "February 2021 – November 2021".',
          },
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Languages',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'level',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'softSkills',
      type: 'array',
      label: 'Soft Skills',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'portfolioNote',
      type: 'group',
      label: 'Portfolio Note',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}

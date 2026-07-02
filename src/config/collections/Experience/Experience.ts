import type { CollectionConfig } from 'payload'

import { experienceRevalidateHooks } from '@/server/cache/revalidate'

export const Experience: CollectionConfig = {
  slug: 'experience',
  hooks: experienceRevalidateHooks,
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'period', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      required: true,
      admin: {
        description: 'Employment period, e.g. "June 2024 - Present".',
      },
    },
    {
      name: 'bullets',
      type: 'array',
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
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

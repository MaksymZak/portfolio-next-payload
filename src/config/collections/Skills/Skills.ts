import type { CollectionConfig } from 'payload'

import { skillsRevalidateHooks } from '@/server/cache'

export const Skills: CollectionConfig = {
  slug: 'skills',
  hooks: skillsRevalidateHooks,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Proficiency level from 1 to 5 (maps to cv.json levels true-count).',
      },
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

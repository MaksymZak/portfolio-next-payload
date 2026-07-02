import type { CollectionConfig } from 'payload'

import { skillsRevalidateHooks } from '@/server/cache/revalidate'

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
      required: false,
      min: 1,
      max: 5,
      admin: {
        description: 'Optional legacy proficiency level; not rendered on the site.',
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

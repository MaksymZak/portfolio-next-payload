import type { CollectionConfig } from 'payload'

import { projectsRevalidateHooks } from '@/server/cache'

export const Projects: CollectionConfig = {
  slug: 'projects',
  hooks: projectsRevalidateHooks,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'label', 'period', 'order'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL segment for /case/[slug], e.g. "portfolio-cms".',
      },
    },
    {
      name: 'label',
      type: 'select',
      required: true,
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Roadmap', value: 'roadmap' },
      ],
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'period',
      type: 'text',
      required: true,
      admin: {
        description: 'Delivery window, e.g. "Q1-Q2 2026" or "Planned Q3 2026".',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'highlights',
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
      name: 'stack',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'text',
      localized: true,
      admin: {
        description: 'Key outcome metric shown on the project card.',
      },
    },
    {
      name: 'technicalDepth',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Extended technical narrative for the case study page.',
      },
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Hero screenshot for the case study page and future OG image use. Upload via Media (recommended: 1280×720 or wider, WebP/PNG). Leave empty until a capture is ready.',
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

import type { CollectionConfig } from 'payload'

import { archiveRevalidateHooks } from '@/server/cache/revalidate'

export const Archive: CollectionConfig = {
  slug: 'archive',
  orderable: true,
  defaultSort: '_order',
  hooks: archiveRevalidateHooks,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
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
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
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
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        description: 'Delivery year, e.g. "2024".',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'Platform', value: 'platform' },
        { label: 'Campaign', value: 'campaign' },
        { label: 'Prototype', value: 'prototype' },
      ],
    },
    {
      name: 'metric',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional outcome metric, e.g. conversion lift or lighthouse score.',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Optional live project URL.',
      },
    },
  ],
}

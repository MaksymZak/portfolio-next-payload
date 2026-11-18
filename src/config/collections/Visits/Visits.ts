import type { CollectionConfig } from 'payload'

export const Visits: CollectionConfig = {
  slug: 'visits',
  admin: {
    useAsTitle: 'visitorId',
    defaultColumns: ['createdAt', 'country', 'locale', 'referrer', 'ref', 'owner'],
    description: 'Owner sessions are stored and hidden from this list.',
    baseFilter: () => ({
      owner: {
        not_equals: true,
      },
    }),
  },
  access: {
    create: () => false,
    update: () => false,
    read: ({ req }) => {
      if (!req.user) return false
      return {
        owner: {
          not_equals: true,
        },
      }
    },
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'visitorId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'owner',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'locale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Ukrainian', value: 'uk' },
      ],
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'referrer',
      type: 'text',
    },
    {
      name: 'ref',
      type: 'text',
    },
    {
      name: 'paths',
      type: 'array',
      maxRows: 30,
      fields: [
        {
          name: 'path',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

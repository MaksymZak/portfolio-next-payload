import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'copy',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'proof',
      type: 'group',
      label: 'Proof',
      admin: {
        description: 'Metric values for the stack section. Labels live in next-intl messages.',
      },
      fields: [
        {
          name: 'years',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Experience metric value, e.g. "4+ Years".',
          },
        },
        {
          name: 'yearsDesc',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Experience metric caption, e.g. "COMMERCIAL DELIVERY".',
          },
        },
        {
          name: 'pages',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Production metric value, e.g. "300+ Pages".',
          },
        },
        {
          name: 'pagesDesc',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Production metric caption, e.g. "SHIPPED OR SUPPORTED".',
          },
        },
        {
          name: 'depth',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Technology depth value, e.g. "Next.js & Payload".',
          },
        },
        {
          name: 'depthDesc',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Technology depth caption, e.g. "CMS DEVISE SPECIALIST".',
          },
        },
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Engineering inventory intro copy below the metric cells.',
          },
        },
      ],
    },
  ],
}

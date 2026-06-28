import type { GlobalConfig } from 'payload'

import { settingsRevalidateHooks } from '@/server/cache'

export const Settings: GlobalConfig = {
  slug: 'settings',
  hooks: settingsRevalidateHooks,
  label: 'Settings',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name shown in the sidebar and header.',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Canonical title, e.g. "Middle Frontend Developer".',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'availability',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'contacts',
      type: 'array',
      admin: {
        description: 'Contact and social links for the home contact section.',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'mail' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Map', value: 'map' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Visible label, e.g. email address or "@handle".',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Link target, e.g. mailto:, tel:, or https:// URL.',
          },
        },
      ],
    },
    {
      name: 'resumeUrl',
      type: 'text',
      admin: {
        description:
          'Optional external CV download URL (https://). Leave empty to link to the on-site /resume page instead.',
      },
    },
  ],
}

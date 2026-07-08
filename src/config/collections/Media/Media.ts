import type { CollectionConfig } from 'payload'

// Segments of letters/digits/-/_ separated by single slashes, no leading/trailing slash
const FOLDER_PATTERN = /^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      // Picked up by the storage plugin: the file is stored under `<prefix>/<filename>`
      // in the R2 bucket. Empty value = bucket root. The field name must stay `prefix`.
      name: 'prefix',
      type: 'text',
      label: 'Folder',
      // Locked after create: changing it would repoint the URL without moving the object
      access: {
        update: () => false,
      },
      admin: {
        description:
          'Bucket folder, e.g. "projects/covers". Leave empty to store in the bucket root. Cannot be changed after upload.',
      },
      validate: (value: null | string | undefined) => {
        if (!value) return true
        if (!FOLDER_PATTERN.test(value)) {
          return 'Use letters, digits, "-" and "_", with "/" between segments — e.g. "projects/covers". No leading or trailing slash.'
        }
        return true
      },
    },
  ],
  upload: true,
}

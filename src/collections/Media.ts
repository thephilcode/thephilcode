import path from 'path';
import { fileURLToPath } from 'url';
import type { CollectionConfig } from 'payload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    staticURL: '/media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Images used across the site — project thumbnails, hero portrait, etc.',
    defaultColumns: ['filename', 'alt', 'createdAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and SEO.',
      },
    },
  ],
};

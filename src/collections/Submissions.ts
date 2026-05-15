import type { CollectionConfig } from 'payload';

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
    description: 'Contact form submissions from the portfolio site.',
  },
  access: {
    read:   ({ req }) => !!req.user,
    create: () => false, // created only via the /api/contact route with overrideAccess
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name',    type: 'text',     required: true },
    { name: 'email',   type: 'email',    required: true },
    { name: 'message', type: 'textarea', required: true },
  ],
};

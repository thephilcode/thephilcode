import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    hidden: true,
    useAsTitle: 'email',
    description: 'Admin users who can access the CMS dashboard.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};

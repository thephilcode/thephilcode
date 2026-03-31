import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
    description: 'Your portfolio projects. Toggle "Featured" to highlight one on the home page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Web Development, Mobile App, Open Source',
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'live',
      type: 'text',
      label: 'Live Site URL',
      admin: {
        description: 'Full URL including https://',
      },
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub URL',
      admin: {
        description: 'Full URL to the GitHub repository',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description:
          'Only one project should be featured at a time. Featured projects appear with gold corner marks at the top of the Work section.',
      },
    },
  ],
};

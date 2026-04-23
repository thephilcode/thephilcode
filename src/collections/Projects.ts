import type { CollectionConfig } from 'payload';

const validateURL = (value: string | null | undefined) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return 'URL must use http:// or https://';
    return true;
  } catch {
    return 'Must be a valid URL';
  }
};

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
    description: 'Your portfolio projects. Toggle "Featured" to highlight one on the home page.',
  },
  versions: {
    drafts: true,
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
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      admin: {
        description: 'Preview image shown at the top of the project card.',
      },
    },
    {
      name: 'live',
      type: 'text',
      label: 'Live Site URL',
      validate: validateURL,
      admin: {
        description: 'Full URL including https://',
      },
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub URL',
      validate: validateURL,
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
          'Up to 3 featured projects appear with gold corner marks at the top of the Work section.',
      },
    },
  ],
};

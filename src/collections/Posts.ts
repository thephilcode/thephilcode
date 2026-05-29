import type { CollectionConfig } from 'payload';
import { slugify } from '@/lib/slugify';

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured'],
    description: 'Blog posts. Toggle "Featured" to pin at the top of the listing.',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.title && !data.slug) {
          data.slug = slugify(data.title);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Auto-generated from title. Unique URL slug (e.g., "my-first-post").',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary shown on cards and used as the SEO meta description.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
      admin: {
        description: 'Hero image shown at the top of the post and on cards.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Post Body',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        description: 'Topic tags shown on cards and the post page.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        description: 'Publication date displayed on the post and used for sorting.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        description: 'Featured posts appear at the top of the blog listing.',
      },
    },
  ],
};

import type { GlobalConfig } from 'payload';

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contact Section',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    description: 'Controls the Contact section intro text, social links, and Formspree ID.',
  },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro Text',
      defaultValue:
        'Open to freelance work, collaborations, and interesting problems. Send a message and I’ll get back to you.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      defaultValue: [
        { platform: 'github', label: 'github.com/thephilcode', url: 'https://github.com/thephilcode' },
        { platform: 'linkedin', label: 'linkedin.com/in/philipayo', url: 'https://linkedin.com/in/philipayo' },
        { platform: 'linktree', label: 'linktr.ee/philipayo', url: 'https://linktr.ee/philipayo' },
      ],
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Linktree', value: 'linktree' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Display Label',
          admin: { description: 'e.g. github.com/thephilcode' },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'formspreeId',
      type: 'text',
      label: 'Formspree Form ID',
      defaultValue: 'xzdkvkzl',
      admin: {
        description: 'The ID portion of your Formspree form URL (e.g. for formspree.io/f/xzdkvkzl enter "xzdkvkzl").',
      },
    },
  ],
};

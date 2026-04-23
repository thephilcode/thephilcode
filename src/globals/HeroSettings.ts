import type { GlobalConfig } from 'payload';

export const HeroSettings: GlobalConfig = {
  slug: 'hero-settings',
  label: 'Hero Section',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    description: 'Controls the hero section: eyebrow text, typing phrases, portrait, and CTA buttons.',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      defaultValue: 'Freelance Web Developer — Uganda',
      admin: {
        description: 'Small text shown above the name (e.g. role/location).',
      },
    },
    {
      name: 'typingPhrases',
      type: 'array',
      label: 'Typing Animation Phrases',
      minRows: 1,
      defaultValue: [
        { phrase: 'Converting Coffee to Code' },
        { phrase: 'Building Digital Experiences' },
        { phrase: 'Crafting Pixel-Perfect UIs' },
        { phrase: 'Turning Ideas into Interfaces' },
      ],
      admin: {
        description: 'The phrases that cycle through the typing animation below the name.',
      },
      fields: [
        {
          name: 'phrase',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Image',
      admin: {
        description: 'Profile photo shown in the hero. Leave empty to use the default.',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View My Work',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#work',
          admin: { description: 'URL or anchor link (e.g. #work)' },
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'GitHub',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: 'https://github.com/thephilcode',
        },
      ],
    },
  ],
};

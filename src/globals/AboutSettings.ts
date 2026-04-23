import type { GlobalConfig } from 'payload';

export const AboutSettings: GlobalConfig = {
  slug: 'about-settings',
  label: 'About Section',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    description: 'Controls the About section bio and tech stack.',
  },
  fields: [
    {
      name: 'bioIntro',
      type: 'textarea',
      label: 'Intro Paragraph',
      defaultValue:
        "I'm a freelance web developer based in Lira, Uganda. I create digital experiences that range from bold and expressive to clean and precise — whatever the project calls for. Whether it's a vibrant landing page that demands attention or a structured platform built for clarity, I shape the work to fit the story.",
    },
    {
      name: 'bioCompanyContext',
      type: 'textarea',
      label: 'Company Paragraph',
      defaultValue:
        'Much of my work is done through [COMPANY], where I collaborate on web projects for clients across Northern Uganda and beyond. I also take on freelance engagements independently.',
      admin: {
        description: 'Use [COMPANY] as a placeholder — it will be replaced with the linked company name below.',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      defaultValue: 'KaKebe Technologies',
    },
    {
      name: 'companyUrl',
      type: 'text',
      label: 'Company URL',
      defaultValue: 'https://github.com/KaKebe-Technologies-Limited',
    },
    {
      name: 'bioClosing',
      type: 'textarea',
      label: 'Closing Paragraph',
      defaultValue:
        "I work primarily with JavaScript and Python, and I've grown especially fond of React and Next.js for bringing ideas to life on the web. I care about craft — the details that make something feel considered, not just functional. If a thing is worth building, it's worth building with intention.",
    },
    {
      name: 'stack',
      type: 'array',
      label: 'Tech Stack',
      defaultValue: [
        { group: 'Languages', items: [{ tag: 'TypeScript' }, { tag: 'JavaScript' }, { tag: 'Python' }, { tag: 'HTML' }, { tag: 'CSS' }] },
        { group: 'Frameworks', items: [{ tag: 'React' }, { tag: 'Next.js' }, { tag: 'Django' }, { tag: 'React Native' }, { tag: 'Bootstrap' }] },
        { group: 'Databases', items: [{ tag: 'PostgreSQL' }] },
        { group: 'Tools', items: [{ tag: 'Git' }, { tag: 'GitHub' }] },
      ],
      admin: {
        description: 'Tech stack groups displayed in the About section.',
      },
      fields: [
        {
          name: 'group',
          type: 'text',
          required: true,
          label: 'Group Name',
          admin: { description: 'e.g. Languages, Frameworks, Databases, Tools' },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Tags',
          minRows: 1,
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

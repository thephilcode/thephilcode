import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Media } from './src/collections/Media';
import { Projects } from './src/collections/Projects';
import { Users } from './src/collections/Users';
import { HeroSettings } from './src/globals/HeroSettings';
import { AboutSettings } from './src/globals/AboutSettings';
import { ContactSettings } from './src/globals/ContactSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— thephilcode',
      icons: [
        { rel: 'icon', type: 'image/x-icon', url: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', url: '/favicon/apple-touch-icon.png' },
      ],
    },
    components: {
      graphics: {
        Icon: '/src/components/admin/Icon#default',
        Logo: '/src/components/admin/Logo#default',
      },
      views: {
        dashboard: {
          Component: '/src/components/admin/Dashboard#default',
        },
      },
    },
  },

  collections: [Media, Projects, Users],

  globals: [HeroSettings, AboutSettings, ContactSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || (() => { throw new Error('PAYLOAD_SECRET environment variable is required'); })(),

  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
});

import type { Metadata } from 'next';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import config from '@payload-config';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = (args: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params: args.params, searchParams: args.searchParams });

const Page = (args: Args) =>
  RootPage({ config, importMap, params: args.params, searchParams: args.searchParams });

export default Page;

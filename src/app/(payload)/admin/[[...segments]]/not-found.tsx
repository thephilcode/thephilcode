import { NotFoundPage } from '@payloadcms/next/views';
import config from '@payload-config';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

const NotFound = (args: Args) =>
  NotFoundPage({ config, importMap, params: args.params, searchParams: args.searchParams });

export default NotFound;

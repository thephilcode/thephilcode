'use server';

import { handleServerFunctions } from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';

export const serverFunction: ServerFunctionClient = async function (args) {
  return handleServerFunctions(args);
};

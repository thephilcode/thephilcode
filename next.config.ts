import { withPayload } from '@payloadcms/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Payload handles its own /admin routes via the (payload) route group
};

export default withPayload(nextConfig);

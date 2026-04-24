import '@payloadcms/next/css';
import './custom-admin.css';
import { RootLayout, metadata } from '@payloadcms/next/layouts';
import config from '@payload-config';
import { importMap } from './admin/importMap';
import React from 'react';
import { serverFunction } from './serverFunction';

export { metadata };

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;

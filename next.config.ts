import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin(
  './src/i18n.ts'
);

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Behind the aaPanel/Nginx reverse proxy, `x-forwarded-host` isn't
      // always set to the real domain (e.g. it can arrive as 127.0.0.1),
      // which trips Next's Server Actions origin check. Explicitly
      // allowing the real domain(s) here is more robust than relying on
      // the proxy config alone.
      allowedOrigins: ['kilaucigarindonesia.com', 'www.kilaucigarindonesia.com'],
    },
  },
  async headers() {
    return [
      {
        // Site-wide baseline: this site has no legitimate reason to be
        // framed by another origin, so DENY is safe everywhere.
        source: '/:path*',
        headers: [...securityHeaders, { key: 'X-Frame-Options', value: 'DENY' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

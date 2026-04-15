import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path((?!api|_next|_vercel|.*\\..*).*)',
        destination: '/fr/:path*',
      },
    ];
  },
};

// @ts-ignore
export default withPWA(withNextIntl(nextConfig));

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
  async redirects() {
    return [
      { source: '/test-environment', destination: 'https://crm.openhousefx.com/test-environment/', permanent: false },
      { source: '/experience', destination: 'https://crm.openhousefx.com/experience/', permanent: false },
      { source: '/alphacompanionCRM', destination: 'https://crm.openhousefx.com/alphacompanionCRM/', permanent: false },
      { source: '/alphacompanion', destination: 'https://crm.openhousefx.com/alphacompanionCRM/', permanent: false },
    ];
  },
};

export default nextConfig;

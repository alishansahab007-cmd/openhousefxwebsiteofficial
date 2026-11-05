const nextConfig = {
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




module.exports = {
  siteUrl: 'https://rspetshub.store',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*'],

  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    };
  },
};

const apiConfig = {
  baseUrl: 'https://en.wikipedia.org/w/api.php?',
  baseParams: {
    origin: '*',
    action: 'parse',
    format: 'json',
    generator: 'links',
    gpllimit: 500

  }
};

export default apiConfig;

const apiConfig = {
  baseUrl: 'https://en.wikipedia.org/w/api.php?',
  baseParams: {
    origin: '*',
    action: 'parse',
    prop: 'links',
    format: 'json'

  }
};

export default apiConfig;

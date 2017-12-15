/* eslint-disable import/no-extraneous-dependencies */
const wdioConf = require('terra-toolkit/lib/wdio/conf');
const WebpackDevService = require('terra-toolkit/lib/wdio/services/index').WebpackDevService;
const localIP = require('ip');
const path = require('path');
const webpackConfig = require('./packages/terra-site/webpack.config.js');

const webpackPort = 8080;

// Flex specs search between local pacakge and repo
let specs = path.join('tests', 'wdio', '**', '*-spec.js');
if (__dirname === process.cwd()) {
  specs = path.join('packages', '*', specs);
}

const config = {
  ...wdioConf.config,

  baseUrl: `http://${localIP.address()}:${webpackPort}`,
  specs,

  seleniumDocker: {
    enabled: !process.env.TRAVIS,
  },

  // Ignore deprecation warnings. When chrome supports /actions API we'll update to use those.
  deprecationWarnings: false,

  webpackPort,
  webpackConfig,

  beforeHook() {
    // Being Terra tests are executed on an SPA, a full refresh is required
    // in order to reset the site. This ensures customProperty tests and any
    // other dom modifications are cleared before starting a test.
    global.browser.refresh();
  },
};


config.services = wdioConf.config.services.concat([WebpackDevService]);
exports.config = config;
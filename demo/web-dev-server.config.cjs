// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file

/** @type {import('@web/dev-server').DevServerConfig} */
const config = {
  hostname: '0.0.0.0',
  port: 8080,
  watch: true,
  nodeResolve: { exportConditions: ['development'] },
  rootDir: '.',
  clearTerminalOnReload: false,
};

module.exports = config;

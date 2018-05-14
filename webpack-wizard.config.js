module.exports = (webpackWizard, { resolveCwdPath }) => ({
  input: {
    favicon: resolveCwdPath('html/favicon-v2.ico'),
    html: resolveCwdPath('html/index.html'),
    modules: [
      resolveCwdPath('src')
    ]
  }
});

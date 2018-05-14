module.exports = (webpackWizard, { resolveCwdPath }) => ({
  input: {
    favicon: resolveCwdPath('html/favicon-v4.ico'),
    html: resolveCwdPath('html/index.html'),
    modules: [
      resolveCwdPath('src')
    ]
  }
});

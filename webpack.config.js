const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (config.mode === "production") {
    config.output.publicPath = "/listen";
  }
  return config;
};

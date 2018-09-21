module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries["main.js"]) {
        entries["main.js"].unshift("./utils/polyfills.js");
      }

      return entries;
    };

    return config;
  }
};

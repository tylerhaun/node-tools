const requireInPath = require("../utils/require-in-path");

module.exports = requireInPath(__dirname, {directories: false, index: false});

const requireInPath = require("../utils/require-in-path");

module.exports = requireInPath(__dirname, {directories: false, index: false});
//const fs = require("fs");
//const path = require("path");
//const debug = require("debug")(__filename);
//
//
//var dirPath = __dirname;
//
//var files = fs.readdirSync(dirPath);
//debug(files);
//
//
//files = files.filter(file => file != "index.js");
//debug(files)
//
//var files = files.filter(file => file.endsWith(".js"))
//debug(files);
//
//files = files.map(file => path.join(__dirname, file))
//debug(files);
//
//var requiredFiles = files.reduce((result, file) => {
//    debug("file", file)
//    var match = file.match(/.*((\/[^\/]*)\.js)/);
//    var baseName = match[2];
//    debug(file, baseName);
//    var fileExports = {[baseName]: require(file)}
//    debug("fileExports", fileExports);
//    return Object.assign({}, result, fileExports);
//})
//
//module.exports = requiredFiles;

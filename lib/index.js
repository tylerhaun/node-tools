const requireInPath = require("./utils/require-in-path");

module.exports = requireInPath(__dirname, {javascript: false})
//const fs = require("fs");
//const path = require("path");
//const debug = require("debug")(__filename);
//
//debug("twetwet");
//
//function isDirectory(source) {
//    return fs.lstatSync(source).isDirectory();
//}
//
//var dirPath = __dirname;
//
//var files = fs.readdirSync(dirPath);
//debug(files);
//
//files = files.map(file => path.join(__dirname, file))
//debug(files);
//
//files = files.filter(file => isDirectory(file));
//debug(files)
//
//
//var requiredFiles = files.reduce((result, file) => {
//    debug("file", file);
//    var baseName = path.basename(file);
//    var fileExports = {[baseName]: require(file)};
//    debug(baseName);
//    debug(fileExports);
//    return Object.assign({}, result, fileExports);
//})
//debug("requiredFiles", requiredFiles);
//
//module.exports = requiredFiles;

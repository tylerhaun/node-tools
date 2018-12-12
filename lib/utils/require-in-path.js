const fs = require("fs");
const path = require("path");
const debug = require("debug")(__filename);


function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

function requireInPath(dirPath, options) {
    var defaultOptions = {
        javascript: true,
        directories: true,
        index: true,
    }
    options = options || {};
    options = Object.assign({}, defaultOptions, options);
    debug("options", options);

    var files = fs.readdirSync(dirPath).map(file => path.join(dirPath, file))
    debug(files);

    var jsFiles = files.filter(file => file.endsWith(".js"))
    if (options.index == false) {
        debug("filtering index")
        jsFiles = jsFiles.filter(file => !file.endsWith("index.js"));
    }
    debug("jsFiles", jsFiles);

    var directories = files.filter(file => isDirectory(file));
    debug("directories", directories);

    var allFiles = [].concat(
        options.directories ? directories : [],
        options.javascript ? jsFiles : []
    );
    debug("allFiles", allFiles);

    var requiredFiles = allFiles.reduce(function(result, file) {
        debug("result", result);
        debug("file", file);
        var baseName = RegExp(/.*\/([^\/^.]*).*?/g).exec(file)[1];
        debug("baseName", baseName);
        var camelCased = baseName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        var fileExports = {[camelCased]: require(file)};
        debug("fileExports", fileExports);
        var ret = Object.assign({}, result, fileExports);
        debug("ret", ret);
        return ret;
    }, {});

    return requiredFiles;

}
module.exports = requireInPath;

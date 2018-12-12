
const fs = require("fs");
const path = require("path");
const debug = require("debug")(__filename);


function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

var dirPath = __dirname;

var files = fs.readdirSync(dirPath);
debug(files);


files = files.filter(file => !isDirectory(file));
debug(files)

files = files.filter(file => file != "index.js");
debug(files)

var files = files.filter(file => file.endsWith(".js"))
debug(files);

files = files.map(file => path.join(__dirname, file))
debug(files);

var requiredFiles = files.reduce((result, file) => {
    var match = file.match(/.*((\/[^\/]*)\.js)/);
    var baseName = match[2];
    debug(file, baseName);
    return Object.assign(result, require(file));
})




module.exports = requiredFiles;

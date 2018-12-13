const onHeaders = require("on-headers");
const onFinished = require("on-finished");
const mustache = require("mustache");
const moment = require("moment");
require("moment-timezone");

const debug = require("debug")(__filename);

mustache.escape = value => value;

var template = "{{timestampH}} {{timestamp}} {{ip}} {{request.method}} {{request.path}} {{response.statusCode}} {{response.elapsedTime}}ms "


function recordHrtime() {
    this._hrtime = process.hrtime();
}

class RequestLogger {

    constructor(request, response) {

        recordHrtime.call(request);
        onHeaders(response, recordHrtime);
        request.timestamp = moment().format();

        this.request = request;
        this.response = response;

        onFinished(response, () => console.log(this.getLogMessage()));

    }

    getElapsedTime() {
        var ms = (this.response._hrtime[0] - this.request._hrtime[0]) * 1e3 + (this.response._hrtime[1] - this.request._hrtime[1]) * 1e-6
        const elapsedTime = ms.toFixed(3)
        return elapsedTime;
    }

    getLogMessage() {

        var request = this.request;
        var response = this.response;
        if (request.body.password) {
            request.body.password = "********";
        }
        response.elapsedTime = this.getElapsedTime();

        var rendered = mustache.render(
            template, {
                request,
                response,
                ip: request.headers["X-Forwarded-For"] || request.ip,
                timestampH: moment().tz("America/Los_Angeles").format("MMMM Do, YYYY hh:mm:ss.SSS A Z"),
                timestamp: moment().format(),
            }
        );
        return rendered;
    }

}

function requestLoggerWrapper(options) {
    return function requestLogger(request, response, next) {

        request.logger = new RequestLogger(request, response);

        return next();
    
    }

}

module.exports = requestLoggerWrapper;


//function requestLoggerWrapper(options) {
//    return function requestLogger(request, response, next) {
//
//        function Logger(request, response, options) {
//
//            // record hrtime for request
//            recordHrtime.call(request);
//
//            var _this = this;
//            _this.logs = [];
//            _this.errors = [];
//
//            _this.formatLogData = function formatLogData() {
//                debug("formatLogData");
//
//                const body = request.body;
//                if (body.password) {
//                    body.password = "********";
//                }
//
//                var userEmail = (request.user || {}).email || "Unauthenticated";
//
//                var ms = (response._hrtime[0] - request._hrtime[0]) * 1e3 +
//                (response._hrtime[1] - request._hrtime[1]) * 1e-6
//
//                // return truncated value
//                const elapsedTime = ms.toFixed(3)
//
//                const badRequestHeaders = ["Cookie", "X-ABL-Access-Key"].map(header => header.toLowerCase());
//                const filteredRequestHeaders = _.omitBy(request.headers, (value, key) => badRequestHeaders.includes(key.toLowerCase()))
//                const badResponseHeaders = ["Set-Cookie"].map(header => header.toLowerCase());
//                const filteredResponseHeaders = _.omitBy(response._headers, (value, key) => badResponseHeaders.includes(key.toLowerCase()));
//
//                const logData = {
//                    timestampH: moment().tz("America/Los_Angeles").format("MMMM Do, YYYY hh:mm:ss.SSS A Z"),
//                    userEmail: userEmail,
//                    request: {
//                        method: request.method,
//                        path: request.path,
//                        ip: miscUtils.getIP(request),
//                        headers: filteredRequestHeaders,
//                        query: request.query,
//                        body: request.body,
//                    },
//                    timestamp: moment().format(),
//                    sessionId: request.sessionId,
//                    logs: _this.logs,
//                    errors: _this.errors,
//                    response: {
//                        headers: filteredResponseHeaders,
//                        elapsedTime: elapsedTime,
//                        statusCode: response.statusCode
//                    }
//                }
//                if (response.locals.error) {
//                    logData.response.error = response.locals.error;
//                }
//
//                return logData;
//
//            }
//
//            sendLog = function sendLog() {
//                debug("sendLog");
//                const formattedData = JSON.stringify(_this.formatLogData());
//                console.log(formattedData);
//            }
//
//            // record hrtime for response
//            onHeaders(response, recordHrtime);
//
//            onFinished(response, sendLog);
//
//
//        }
//
//        function recordHrtime () {
//            this._hrtime = process.hrtime();
//        }
//
//        request.logger = new Logger(request, response, options);
//
//        return next();
//        
//    }
//}

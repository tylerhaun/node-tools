const rp = require("request-promise");

module.exports = function(proxyUrl) {

    return function reverseProxy(request, response, next) {
        console.log("request", request);
        var forwardedServerUrl = proxyUrl + request.originalUrl;
        console.log("forwardedServerUrl", forwardedServerUrl);
        var rpOptions = {
            method: request.method,
            uri: forwardedServerUrl,
            body: request.body,
            json: true
        };
        console.log("rpOptions", rpOptions);
        rp(rpOptions)
            .then(body => {
                //console.log("got body", body);
                response.send(body);
            })
        .catch(next);
    }

}

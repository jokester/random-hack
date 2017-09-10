/**
 * A POC of cross-domain ajax, using Yahoo Query Lanauage (YQL) server
 * - GET only
 * - NO cookies / custom headers / http basic auth / stuff
 *
 * TODO: see if we can do POST (rumor says it's possible) and other stuff
 */
var YQLAjax;
(function (YQLAjax) {
    // a minimal jsonp implementation
    let callbackCount = 100000;
    let globe = window;
    /**
     * @param {string} url the *final* url, contains all parameter encoding stuff
     */
    function getJSON(url, diag = false) {
        const cbName = `jsonpcallback_${callbackCount++}`;
        const yql = `select * from json where url="${url}"`;
        let realUrl = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(yql)}&format=json&callback=${cbName}`;
        if (diag) {
            realUrl += "&diagnostics=true";
            console.log("yql query", { url, yql, realUrl });
        }
        return new Promise((fulfill, reject) => {
            const s = document.createElement("script");
            // <script> got executed
            const jsonpSuccess = globe[cbName] = (val) => {
                delete globe[cbName];
                document.body.removeChild(s);
                if (diag) {
                    console.log("YQL response", val);
                }
                if (val.error || !val.query.count)
                    reject(val);
                else {
                    fulfill(val.query.results.json);
                }
            };
            // <script> got an error
            const jsonpFail = (reason) => {
                delete globe[cbName];
                document.removeChild(s);
                reject(reason);
            };
            s.src = realUrl;
            s.onabort = s.onerror = (ev) => jsonpFail(ev);
            document.body.appendChild(s);
        });
    }
    YQLAjax.getJSON = getJSON;
})(YQLAjax || (YQLAjax = {}));

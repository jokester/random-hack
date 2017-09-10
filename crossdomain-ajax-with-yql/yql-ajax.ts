/**
 * A POC of cross-domain ajax, using Yahoo Query Lanauage (YQL) server
 * - GET only
 * - NO cookies / custom headers / http basic auth / stuff
 *
 * TODO: see if we can do POST (rumor says it's possible) and other stuff
 */
namespace YQLAjax {

    // a minimal jsonp implementation
    let callbackCount = 100000;
    let globe = window as any as { [cbName: string]: Function };

    /**
     * JSON response from YQL
     * NOTE: the original response goes into the T part 
     */
    interface YQLJSONResponse<T> {
        error?: any;
        query: {
            count: number;
            created: string;
            lang: string;
            diagnostics?: {
                url: {
                    content: string;
                }
            };
            results: {
                json: T;
            };
        };
    }

    /**
     * @param {string} url the *final* url, contains all parameter encoding stuff
     */
    export function getJSON<T = any>(url: string, diag = false): Promise<T> {

        const cbName = `jsonpcallback_${callbackCount++}`;

        const yql = `select * from json where url="${url}"`;
        let realUrl = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(yql)}&format=json&callback=${cbName}`;

        if (diag) {
            realUrl += "&diagnostics=true";
            console.log("yql query", { url, yql, realUrl });
        }

        return new Promise<T>((fulfill, reject) => {

            const s = document.createElement("script");

            // <script> got executed
            const jsonpSuccess = globe[cbName] = (val: YQLJSONResponse<T>) => {
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
            const jsonpFail = (reason: any) => {
                delete globe[cbName];
                document.removeChild(s);
                reject(reason);
            };

            s.src = realUrl;
            s.onabort = s.onerror = (ev: UIEvent | ErrorEvent) => jsonpFail(ev);
            document.body.appendChild(s);
        });
    }
}

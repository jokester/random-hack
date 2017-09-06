# crossdomain-ajax-with-yql

This code shows how to do cross-domain Ajax (only GET-ing a URL, no POST or custom headers)
without restriction of same-origin policy.

Internally, it uses jsonp API of [Yahoo Query Language (YQL)](https://developer.yahoo.com/yql/guide/).
This (not new) idea is learnt from [jquery.xdomainajax.js plugin by JAMES PADOLSEY](https://j11y.io/javascript/cross-domain-requests-with-jquery/).

*CAUTION*: This is better considered a POC or temporal hack, rather than production-ready technique.
Also, remember for security that all your traffic flows through Yahoo's server.


# crossdomain-ajax-with-yql

This code shows how to do cross-domain Ajax (only GET-ing a URL, no POST or custom headers)
without restriction of same-origin policy.

### How does it work

Internally, it uses jsonp API of [Yahoo Query Language (YQL)](https://developer.yahoo.com/yql/guide/).

This (not new) idea is learnt from [jquery.xdomainajax.js plugin by JAMES PADOLSEY](https://j11y.io/javascript/cross-domain-requests-with-jquery/).

FIXME: may be able to POST with [this post](http://christianheilmann.com/2009/11/16/using-yql-to-read-html-from-a-document-that-requires-post-data/).

*CAUTION*: This is better considered a POC or temporally hack, rather than production-ready technique.
Also, please note for security that all your traffic flows through Yahoo's server.

### How to build

```sh
$ tsc --target es6 yql-ajax.ts
```

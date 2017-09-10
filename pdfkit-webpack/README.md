# pdfkit-webpack

This code shows an alternative way
(to that shown in [How to compile PDFKit for use in the browser](https://github.com/devongovett/pdfkit/wiki/How-to-compile-PDFKit-for-use-in-the-browser))
to use pdfkit in browser: to bundle pdfkit and its dependencies with webpack.

The loader settings are taken from [pdfkit#659](https://github.com/devongovett/pdfkit/issues/659#issuecomment-321452649).

### How to build

```sh
$ yarn && node_modules/.bin/webpack
```

and open index.html in a proper browser.

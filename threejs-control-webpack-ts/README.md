# threejs-control-webpack-ts

This example shows how to bundle `OrbitControls` inside `three.js` distribution.

(This control is quite useful, yet not exported as a (AMD | CommonJS | ES6 | younameit) module.
See [this issue](https://github.com/mrdoob/three.js/issues/9562) for detail).

### How to build

```sh
$ yarn && node_modules/.bin/webpack

# (despite the following warning, the control still get bundled)

WARNING in ./three-control-demo.ts
9:57-76 "export 'OrbitControls' (imported as 'THREE') was not found in 'three'
```

and open index.html in a proper browser.

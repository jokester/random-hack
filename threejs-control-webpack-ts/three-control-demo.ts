import * as THREE from "three";

// a declaration to workaround TypeScript compiler
declare function require<T>(module: string): T;

// OrbitControls.js expects a global THREE object
(window as any).THREE = THREE;

// NOTE: OrbitControls must be included with require:
// using "import" cause it to be executed before global THREE becomes available
require("three/examples/js/controls/OrbitControls");

// ... code that uses THREE and THREE.OrbitControls
console.log("THREE:", THREE);
console.log("three/examples/js/controls/OrbitControls:", THREE.OrbitControls);

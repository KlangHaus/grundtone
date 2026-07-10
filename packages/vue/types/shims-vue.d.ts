// Ambient module declaration for `.vue` single-file-component imports.
//
// `packages/vue/tsconfig.json` (via `vueCompilerOptions`) only resolves
// `.vue` imports under `vue-tsc`; the root `tsconfig.json`'s `vueCompilerOptions`
// has the same limitation and the root pre-push check runs plain `tsc`, which
// ignores that block entirely and needs an ambient shim to know what a `.vue`
// import even is. Without this, every relative `.vue` import in this package
// fails with TS2307 ("Cannot find module").
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, unknown>;
  export default component;
}

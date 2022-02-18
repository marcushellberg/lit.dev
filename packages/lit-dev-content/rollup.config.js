/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';

const terserOptions = {
  warnings: true,
  ecma: 2020,
  compress: {
    unsafe: true,
    passes: 2,
  },
  output: {
    // "some" preserves @license and @preserve comments
    comments: 'some',
    inline_script: false,
  },
  mangle: {
    // TODO(aomarks) Find out why we can't do property renaming. Something in
    // MWC?
    properties: false,
  },
};

export default [
  {
    input: [
      'lib/components/copy-button.js',
      'lib/components/litdev-banner.js',
      'lib/components/litdev-version-selector.js',
      'lib/components/litdev-drawer.js',
      'lib/components/litdev-example.js',
      'lib/components/litdev-switchable-sample.js',
      'lib/components/litdev-tutorial.js',
      'lib/components/litdev-tutorial-card.js',
      'lib/components/litdev-search.js',
      'lib/components/playground-elements.js',
      'lib/components/resize-bar.js',
      'lib/github/github-signin-receiver-page.js',
      'lib/global/mobile-nav.js',
      'lib/pages/docs.js',
      'lib/pages/home.js',
      'lib/pages/home-components.js',
      'lib/pages/playground.js',
      'lib/pages/playground-inline.js',
      'lib/util/lit-hydrate-support.js',
      'lib/util/dsd-polyfill.js',
    ],
    output: {
      dir: 'rollupout',
      format: 'esm',
      // Preserve directory structure for entrypoints.
      entryFileNames: ({facadeModuleId}) =>
        facadeModuleId.replace(`${__dirname}/lib/`, ''),
      manualChunks: (id) => {
        // Create some more logical shared chunks. In particular, people will
        // probably be looking for lit.js in devtools!
        const relative = id.replace(`${__dirname}/node_modules/`, '');
        if (
          relative.startsWith('lit/') ||
          relative.startsWith('lit-html/') ||
          relative.startsWith('lit-element/') ||
          relative.startsWith('@lit/reactive-element/')
        ) {
          return 'lit';
        }
        if (
          relative.startsWith('@material/mwc-base/') ||
          relative.startsWith('@material/base/')
        ) {
          return 'mwc-base';
        }
        if (relative.startsWith('tslib/')) {
          return 'tslib';
        }
      },
      // Skip the usual "-[hash]" suffix. We pre-load certain common chunks so
      // we want to know its exact name (e.g. "lit.js"), and we don't have cache
      // headers that would take advantage of hashed names anyway.
      chunkFileNames: '[name].js',
    },
    plugins: [
      resolve(),
      terser(terserOptions),
      summary({
        // Already minified.
        showMinifiedSize: false,
      }),
    ],
  },

  // These scripts are inlined and must run before first render because they set
  // global CSS classes/attributes that would otherwise cause restyle/relayout.
  //
  // We compile them separately here because they include imports for a small
  // amount of code that we want to inline directly (again, because we want to
  // execute immediately), even though that code is technically duplicated into
  // the asynchronously-loaded module bundles above.
  {
    input: [
      'lib/global/apply-mods.js',
      'lib/global/initialize-typescript-attribute.js',
      'lib/global/mobile-drawer.js',
      'lib/global/dsd-native.js',
    ],
    output: {
      dir: 'rollupout',
      format: 'esm',
      // Preserve directory structure for entrypoints.
      entryFileNames: ({facadeModuleId}) =>
        facadeModuleId.replace(`${__dirname}/lib/`, ''),
    },
    plugins: [
      terser({
        ...terserOptions,
        output: {
          ...terserOptions.output,
          // Remove license comment for inline script.
          comments: false,
        },
      }),
      summary({
        // Already minified.
        showMinifiedSize: false,
      }),
    ],
  },
];

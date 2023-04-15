# Runme Web Extension

A browser web extension to add Runme buttons to markdown files on the internet. Download the extension on the marketplaces:

- [Chrome](https://chrome.google.com/webstore/detail/runme-web-extension/lnihnbkolojkaehnkdmpliededkfebkk)
- [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/runme/)

## Development

### Setup

Install dependencies via:

```sh { name=setup }
npm i
```

then build files via:

```sh { name=bundleAll }
npm run bundle
```

building for Chrome:

```sh { name=bundleChrome }
npm run bundle:chrome
```

building for Firefox:

```sh { name=bundleFirefox }
npm run bundle:firefox
```

### Test

This project tests the extension files using component tests and the extension integration via e2e test with WebdriverIO.

Run unit/component tests:

```sh { name=testUI }
npm run test:component
```

Run e2e tests:

```sh { name=testE2E }
npm run test:e2e
```

### Building the Extension

#### Firefox

Bundle the extension by running `npm run build`. The generated files are in `dist/`. You can also grab a version from the [latest test](https://github.com/stateful/runme-web-extension/actions/workflows/test.yml) run on the `main` branch.

To load the extension in Firefox go to `about:debugging#/runtime/this-firefox` or `Firefox > Preferences > Extensions & Themes > Debug Add-ons > Load Temporary Add-on...`

Here locate the `dist/` directory and open `manifestv3.json`

#### Chrome

Bundle the extension for Google Chrome by running `npm run build:chrome`. The generated files are in `dist/`. You can also grab a version from the [latest test](https://github.com/stateful/runme-web-extension/actions/workflows/test.yml) run on the `main` branch.

To load the extensions in Google Chrome go to `chrome://extensions/` and click `Load unpacked`. Locate the dist directory and select `manifest.json`.

## Files:

- content-script - UI files
- background.ts - Background script/Service worker
- index.html - popup UI

If you have any questions feel free to open an issue.

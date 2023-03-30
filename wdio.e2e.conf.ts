import fs from 'node:fs/promises'
import type { Options } from '@wdio/types'

import { config as baseConfig } from './wdio.conf.js'

import path from 'node:path'
import url from 'node:url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const chromeExtension = (await fs.readFile(path.join(__dirname, 'runme-chrome.crx'))).toString('base64')
const firefoxExtension = path.join(__dirname, 'dist')

export const config: Options.Testrunner = {
  ...baseConfig,
  specs: ['./e2e/**/*.e2e.ts'],
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless=new'],
      extensions: [chromeExtension]
    }
  // }, {
  //   browserName: 'firefox',
  }],
  // services: [
  //   ...baseConfig.services!,
  //   ['firefox-profile', {
  //     extensions: [firefoxExtension]
  //   }]
  // ]
}

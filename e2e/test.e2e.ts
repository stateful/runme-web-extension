import { browser, $, expect } from '@wdio/globals'

const isFirefox = browser.capabilities.browserName === 'firefox'

describe('Runme Web Extension e2e test', () => {
  it('should load with working extension', async () => {
    await browser.url('https://github.com/webdriverio/webdriverio')
    const selector = isFirefox
      ? '.runme-button'
      : 'runme-button'
    await expect($(selector)).toBePresent()
  })
})

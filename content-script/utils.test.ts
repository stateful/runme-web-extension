import { expect } from '@wdio/globals'

import { getLinkDetails } from './utils.js'

describe('utils', () => {
  it('getLinksDetails', () => {
    /**
     * changing the pathname triggers a page load, so to avoid
     * constantly loading this page we only do it if we are not
     * on this pathname
     */
    if (window.location.pathname !== '/foo/bar') {
      window.location.pathname = '/foo/bar'
    }

    expect(getLinkDetails()).toEqual({
      fileToOpen: 'README.md',
      repository: 'https://github.com/foo/bar.git',
    })

    expect(getLinkDetails('/webdriverio/webdriverio')).toEqual({
      fileToOpen: 'README.md',
      repository: 'https://github.com/webdriverio/webdriverio.git',
    })

    expect(getLinkDetails('/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework')).toEqual({
      fileToOpen: 'packages/wdio-jasmine-framework/README.md',
      repository: 'https://github.com/webdriverio/webdriverio.git'
    })

    expect(getLinkDetails('/webdriverio/webdriverio/blob/main/packages/wdio-jasmine-framework/README.md')).toEqual({
      fileToOpen: 'packages/wdio-jasmine-framework/README.md',
      repository: 'https://github.com/webdriverio/webdriverio.git'
    })

    expect(getLinkDetails('/webdriverio/webdriverio/blob/main/CODE_OF_CONDUCT.md')).toEqual({
      fileToOpen: 'CODE_OF_CONDUCT.md',
      repository: 'https://github.com/webdriverio/webdriverio.git'
    })
  })
})

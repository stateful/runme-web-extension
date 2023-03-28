import { test, expect, vi } from 'vitest'

import { getLinkDetails } from './utils.js'

test('getLinkDetails', () => {
    globalThis.document = <any>{ location: { pathname: '/webdriverio/webdriverio' } }
    expect(getLinkDetails()).toMatchSnapshot()

    globalThis.document = <any>{ location: { pathname: '/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework' } }
    expect(getLinkDetails()).toMatchSnapshot()

    globalThis.document = <any>{ location: { pathname: '/webdriverio/webdriverio/blob/main/packages/wdio-jasmine-framework/README.md' } }
    expect(getLinkDetails()).toMatchSnapshot()

    globalThis.document = <any>{ location: { pathname: '/webdriverio/webdriverio/blob/main/CODE_OF_CONDUCT.md' } }
    expect(getLinkDetails()).toMatchSnapshot()
})
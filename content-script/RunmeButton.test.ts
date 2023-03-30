import { html, render } from 'lit'
import { $, expect, browser } from '@wdio/globals'

import { RunmeButton } from './RunmeButton.js'

describe('WebdriverIO Component Testing', () => {
  afterEach(() => {
    document.querySelector('runme-button')?.remove()
  })

  it('does not render button if no parameters are given', async () => {
    render(
      html`<runme-button />`,
      document.body
    )
    await expect($('runme-button').shadow$('a')).not.toBePresent()
  })

  it('should render badge button', async () => {
    render(
      html`<runme-button repository="https://github.com/stateful/runme" />`,
      document.body
    )
    await expect($('runme-button').shadow$('a')).toBePresent()
    await expect($('runme-button').shadow$('a')).toHaveAttribute(
      'href',
      'https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Fstateful%2Frunme&fileToOpen=README.md'
    )
    await expect($('runme-button').shadow$('a')).toHaveTextContaining('Run this : README.MD')
  })

  it('should render minified button', async () => {
    render(
      html`<runme-button repository="https://github.com/stateful/runme" variant="minified" />`,
      document.body
    )
    await expect($('runme-button').shadow$('a')).toBePresent()
    await expect($('runme-button').shadow$('a')).toHaveAttribute(
      'href',
      'https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Fstateful%2Frunme&fileToOpen=README.md'
    )
    await expect($('runme-button').shadow$('a')).toHaveText('')
  })

  it('should allow to render without Lit', async () => {
    const elem = RunmeButton.render('https://github.com/foo/bar', 'TEST.md', 'badge')
    document.body.appendChild(elem)
    await expect($('runme-button').shadow$('a')).toBePresent()
    await expect($('runme-button').shadow$('a')).toHaveAttribute(
      'href',
      'https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Ffoo%2Fbar&fileToOpen=TEST.md'
    )
    await expect($('runme-button').shadow$('a')).toHaveTextContaining('Run this : TEST.MD')
  })
})

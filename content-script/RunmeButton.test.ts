import { html, render } from 'lit'
import { $, expect, browser } from '@wdio/globals'

import { RunmeButton } from './RunmeButton.js'

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

if (isFirefox) {
  describe('Runme Button (Firefox)', () => {
    it('should allow to render without Lit', async () => {
      const elem = RunmeButton.render('https://github.com/foo/bar', 'TEST.md', 'badge')
      document.body.appendChild(elem)
      await expect($('.runme-button').$('a')).toBePresent()
      await expect($('.runme-button').$('a')).toHaveAttribute(
        'href',
        'https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Ffoo%2Fbar&fileToOpen=TEST.md'
      )
      await expect($('.runme-button').$('a')).toHaveTextContaining('Run this : TEST.MD')
    })
  })
} else {
  describe('Runme Button (Chrome)', () => {
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

    it('should render listItem button', async () => {
      render(
        html`<runme-button repository="https://github.com/stateful/runme" variant="listItem" />`,
        document.body
      )
      await expect($('runme-button').shadow$('a')).not.toBePresent()
      await expect($('runme-button').shadow$('div')).toBePresent()
      await expect($('runme-button').shadow$('div')).toHaveText('Checkout with Runme')
    })

    it('should allow to render using static method', async () => {
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
}

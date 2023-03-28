import './RunmeButton.js'
import './index.css'

import { getLinkDetails } from './utils.js'
import { BUTTON_VARIANTS, ATTACH_POINTS } from './constants.js'

console.debug('Runme Web Extension initiated, more information at https://github.com/stateful/runme-web-extension')

function init(root: HTMLElement = document.body) {
  const { repository, fileToOpen } = getLinkDetails()
  if (!repository) {
    return
  }


  for (const [selector, factory] of Object.entries(ATTACH_POINTS)) {
    if (!document.querySelector(selector)) {
      continue
    }

    const targetElems = factory(root, selector)
    const variant = BUTTON_VARIANTS[selector] || 'badge'
    console.log('ATTACH to', selector, targetElems.length);
    
    for (const el of targetElems) {
      const runmeButton = document.createElement('runme-button')
      runmeButton.setAttribute('repository', repository)
      runmeButton.setAttribute('file', fileToOpen)
      runmeButton.setAttribute('variant', variant || 'badge')
      el.appendChild(runmeButton)
    }
  }
}

/**
 * initial scan to attach Runme button
 */
init(document.body)

/**
 * listen to DOM changes and attach if appropiate
 */
const config = { attributes: false, childList: true, subtree: true };
const callback = (mutationList: MutationRecord[]) => {
  for (const mutation of mutationList) {
    if (
      !mutation.target ||
      mutation.addedNodes.length === 0 ||
      (mutation.target as any).querySelector('runme-button')
    ) {
      continue
    }

    init(mutation.target as HTMLElement)
  }
};
const observer = new MutationObserver(callback);
observer.observe(document.body, config)

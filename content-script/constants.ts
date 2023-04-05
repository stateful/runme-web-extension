import { getLinkDetails, type LinkDetails } from "./utils"
import { getVSCodeHref } from './utils.js'

export const ATTACH_POINTS: Record<string, (root: HTMLElement, selector: string, linkDetails?: LinkDetails) => Element[]> = {
  /**
   * Inject the button in the header of the markdown file when looking at
   * the repository main view, e.g. https://github.com/refined-github/refined-github
   */
  '#readme > div:first-child': (root: Element, selector: string) => {
    const editBtn = document.querySelector('a[aria-label="Edit this file"]')
    if (editBtn) {
      return [editBtn.parentElement!]
    }
    return [...root.querySelectorAll(selector)]
  },
  /**
   * Inject button next to "Display Source Blob" and "Display the rendered blob"
   * button in the file detail view, e.g. https://github.com/refined-github/refined-github/blob/main/contributing.md
   */
  'readme-toc > div > div': (root: Element, selector: string) => {
    const containers: Element[] = []
    for (const el of [...root.querySelectorAll(selector)]) {
      const btnGroup = el.querySelector('div .BtnGroup')
      if (btnGroup) {
        const container = document.createElement('div')
        container.className = 'btnRunme'
        container.style.float = 'left'
        btnGroup.prepend(container)
        containers.push(container)
      }
    }

    return containers
  },
  /**
   * Inject a minified button in any code example
   */
  '.zeroclipboard-container': (root: Element, selector: string) => {
    const containers: Element[] = []
    for (const el of [...root.querySelectorAll(selector)]) {
      const container = document.createElement('div')
      container.className = 'btnRunme'
      container.style.position = 'absolute'
      container.style.top = '7px'
      container.style.right = '0px'
      container.style.transform = 'translateX(-45px)'
      containers.push(container)
      el.appendChild(container)
    }

    return containers
  },
  /**
   * Inject a check out button in the Code drop down
   */
  '#local-panel ul': (root: Element, selector: string, linkDetails) => {
    const list = root.querySelector(selector)
    const li = document.createElement('li')
    li.setAttribute('class', 'Box-row Box-row--hover-gray p-3 mt-0')
    const a = document.createElement('a')
    a.setAttribute('class', 'd-flex flex-items-center color-fg-default text-bold no-underline')
    if (linkDetails) {
      a.setAttribute('href', getVSCodeHref(linkDetails.repository, linkDetails.fileToOpen))
    }

    li.appendChild(a)
    if (list) {
      list.appendChild(li)
      return [a]
    }
    return []
  }
}

export const BUTTON_VARIANTS = {
  '.zeroclipboard-container': 'minified',
  '#local-panel ul': 'listItem'
}

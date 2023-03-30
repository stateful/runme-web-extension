import { getLinkDetails, type LinkDetails } from "./utils"
import { getVSCodeHref } from './utils.js'

export const ATTACH_POINTS: Record<string, (root: HTMLElement, selector: string, linkDetails?: LinkDetails) => Element[]> = {
  '#readme > div': (root: Element, selector: string) => {
    const editBtn = document.querySelector('a[aria-label="Edit this file"]')
    if (editBtn) {
      return [editBtn.parentElement!]
    }
    return [...root.querySelectorAll(selector)]
  },
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
  '.zeroclipboard-container': (root: Element, selector: string) => {
    const containers: Element[] = []
    for (const el of [...root.querySelectorAll(selector)]) {
      const container = document.createElement('div')
      container.className = 'btnRunme'
      container.style.position = 'absolute'
      container.style.top = '7px'
      container.style.right = '45px'
      containers.push(container)
      el.appendChild(container)
    }

    return containers
  },
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
    list!.appendChild(li)
    return [a]
  }
}

export const BUTTON_VARIANTS = {
  '.zeroclipboard-container': 'minified',
  '#local-panel ul': 'listItem'
}

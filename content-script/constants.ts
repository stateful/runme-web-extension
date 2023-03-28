export const ATTACH_POINTS: Record<string, (root: HTMLElement, selector: string) => Element[]> = {
    '#readme > div': (root: Element, selector: string) => [...root.querySelectorAll('#readme > div')],
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
    '.markdown-body .highlight': (root: Element, selector: string) => {
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
    }
}

export const BUTTON_VARIANTS = {
    '.markdown-body .highlight': 'minified'
}

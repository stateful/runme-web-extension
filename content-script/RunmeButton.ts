import '@webcomponents/custom-elements'
import 'lit/polyfill-support.js'

import { LitElement, css, html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { getVSCodeHref } from './utils.js'

type Variant = 'badge' | 'minified' | 'listItem'
const DEFAULT_FILE_TO_OPEN = 'README.md'

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
class LitBaseClass extends LitElement {
  @property({ type: String })
  repository = ''

  @property({ type: String })
  file = DEFAULT_FILE_TO_OPEN

  @property({ type: String })
  variant: Variant = 'badge'
}
const BaseClass = isFirefox ? class {} as typeof LitElement : LitBaseClass

/**
 * button image captured from
 * captured from https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg
 */
function runmeBadgeImage (filename: string) {
  return html`
  <svg width="132.3" height="20" viewBox="0 0 1323 200" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Run this : README">
    <title>Run this : ${filename.toUpperCase()}</title>
    <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-opacity=".1" stop-color="#EEE" />
      <stop offset="1" stop-opacity=".1" />
    </linearGradient>
    <mask id="m">
      <rect width="1323" height="200" rx="30" fill="#FFF" />
    </mask>
    <g mask="url(#m)">
      <rect width="754" height="200" fill="#555" />
      <rect width="569" height="200" fill="#5B3ADF" x="754" />
      <rect width="1323" height="200" fill="url(#a)" />
    </g>
    <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
      <text x="220" y="148" textLength="494" fill="#000" opacity="0.25">Run this </text>
      <text x="210" y="138" textLength="494">Run this </text>
      <text x="809" y="148" textLength="469" fill="#000" opacity="0.25">README</text>
      <text x="799" y="138" textLength="469">README</text>
    </g>
    <image x="40" y="35" width="130" height="130"
      xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjExIiBmaWxsPSIjNUIzQURGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF8zMDhfMTQyIiB0cmFuc2Zvcm09InNjYWxlKDAuMDExMTExMSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8zMDhfMTQyIiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRm9BQUFCYUNBWUFBQUE0cUVFQ0FBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQURPMGxFUVZSNG5PM2R5MjhPVVJnRzhPZDFqWVRFUmxpeVptUEZDb242RTJySnpsWWtwU0ZCSWhGbGcwU0VCWkhZNFQrb0x0alIwSTNiampZcTRoYUNSVzhlaStsSjIvaDhuY3M1MzVrejgvelcwNW4zUEpuT04rOWN6Z0FpSWlJaUlpSk5SSElOeVlza1A1RDhUUEl5eVUyeDYyb2Nra1A4MXcrU0owbXVpMTFmWTh6dnlmL3pudVFSa2l0ajE1bThMaUV2OW9wa2YreGFrNVl6YUdlWTVNN1lOU2VwWU5BaytZZmtQWkxiWXRlZWxCSkJPMU1rcjVMY0dIc01TYWdRdFBPVjVDREp0YkhIVW1zZWduYmVrVHhFMG1LUHFaWThCdTA4SWJrbjlyaHFKMERRempESkhiSEhWeHNCZ3liSmFaSTNTVzZPUGM3b0FnZnQvR0xXNm0rSVBkNW9laFMwMDk2V3ZzZEJPMG0yOUpWT3AwalNWeUVsakFBNGJtWmpFV3ZJYlVYc0FpcllEK0FaRTJucFV3NGF5UDRqK3dHOFljMWIrcFFQSFoxOEEzQUp3QlV6bTRwZHpHSk5DOW9aQjNBR3dGMHpxMFdOVFEzYUdRVXdZR2FQWXhmUzlLQ2Rod0NPbWRtTFdBV2svbU9ZVngrQU1XWXQvWllZQmJSbGoxN3NONEJyQU02YjJjOWViYlNOUVR1VEFNNEJ1R1ZtYzZFMzF1YWduZGNBenByWi9aQWJVZEFMUmdDY01MUG5JVmF1b0pjaWdBY0FCczNzcmM4VnQrV3NJNjlnTGIzMjZPNjh0ZlFLT3A4SkFLZFJvYVZYME1XTUlyc0cvcWpvSHlyb2NncTM5QXE2dkJrQTE1R2RFazR2dC9DcThQVTAxbW9BUndITUFoaFlibUh0MGRWOU1iTmxYeWZSZVhTUEtPanE3dVJaU01mbzhtYVFYVzQ5bFdkaEJWMU80ZE03SFRxS0dRV3d6OHdPRkwwdHBxRHptUUJ3R01DdU1sMGhvRVBIY3J4ZFZGTFFuVTBEdUlIc3pzdDNIeXRVMEVzRnUvQ3ZvQmNFZlRwVlA0Ylp6ZG1EWnRZWDhoSGdOdS9SUFgzY29JMUJSM21BcGsxQnp3SzRqZXhNNG1Pdk45NldvUFdRWTJCUEFld3Qwekw3MXRTZ3g1RzF6THZyOEd3MDBMeERSMjFmcldoSzBONWJadDlTRHpwWXkreGJ5a0VuOVVKbkpjRmVRdTR1eVZlVUsrbHh3SHJwUGpBM2pjVDYyT09OSm5EQW1oakZDUmp5TU1udHNjZFhHd0VDMXVSVm5YZ01XTk94ZGVNaFlFMHdtRWVGZ0RWbFpoRWxBcDVqTm1QTTF0aTFKNlZneUpyV3VLeWNBYjlrMjFwbTMwaE9kZ200dlMyemJ5UXZkQWhZSDFQd2pkbm5RWWJtOSt4UDFPZEJSRVJFUkVSRTB2TVhKcEZOUnczSThCd0FBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+" />
  </svg>`
}

function runmeLogoImage (size = 20) {
  if (isFirefox) {
    return html`<img style="margin: 4px 0 1px" width=${size} height=${size} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABp1BMVEUAAABJSdtgQN9VOeNgQN9aPOFVOeNYO+JeOeNbN9tePN1cOd5bO99aOt9cOt9bOeBaO+BbOt9bOd9cO+BbOuBcOd5bOd9bO99aOt9bOt9bOt9bOt9aOuBbOt9cOt9bOt9bOt9bOt9aOt9bOuBbOt9bOuBbOt9bOt9bOt9bOt9bOuBbOd9bOt9cO99cPN9ePeBePuBfP+BgP+BgQOBiQuBjQ+FnSeFoSeJpSuJpS+JtUONuUeNvUuNyVuRzV+R1WuR2WuR3W+R8YuZ9Y+Z+ZOZ/ZeaAZuaGbueHb+iJceiJcuiKcuiLc+iSfOqUfuqUf+qWgOqWgeuXg+uYg+uZhOuZheueiuyfi+ygjeygje2pl+6pmO6qme6rmu+sm++tnO+3qPG4qfG5q/G6rPG6rPK7rvK8r/LCtvPDt/PEuPPEufTMwvXNw/XNxPXPxfbPxvbQx/bWzvfa0vja0/jb1Pji3Pnj3vrk3/rm4frn4vro5Pvp5fvq5vvt6fvu6vzv7Pzw7Pzw7fz18/329P339f339v36+f76+v78+/79/f/+/f/+/v////+TJw6gAAAALHRSTlMABwgJEBESGhscHl5fYGFiY3Z4ent9ra6vsMnKy83Oz9fY2dvi4+Tv8PHz9CS5tugAAAABYktHRIxsC9JDAAAB+0lEQVRo3u3aZVNCQRQG4BXFTixUVLAIF1Ts7hYVu7vFxsDGRs+PdkUZ/eaM+vLB2fcH8MzsPXfv2cMy5k1wTIoun/9p8nXqaCX7TGCCkUNiiA/0GSFpHJbM8HcjLI8DkxvqXat0Do1GIZBEDo5K1JURjRiULJbDE8VS8Egyy8YjOmbCIybG/RCJSEQiEpHIDxGzGY/YXWdTVWYsYnYRefaGLViEvHH2leARullrxiNi0VbaLHCEns8nK+GIyPVoDR6hh4OeIjgiFs3ZUQpHiNwbdXhE1PNSQwEcITqcLsYjRK7xCjxCj9vdeETE0VWIR8g9X4tHiO5nG/EIPR0PlsKRt0KzleMRut1tscARUc+OZiscITpfLMcjRJcDfkDo9L8gF3b8g18og5fwZhO6hG934C/jy4mtDL1BHg2UoDfIuxn4Vn89B/9ovTg60Z/fx60ueCNxMgZviQ6nrPA2dbEe3aa61+ENt8fZjj46POx3F3KORa5GquEH04kKzrGIZ7kVfcS+WW2CDwsOeqFjD+8AZ+i3Y6JvRlH9rtNJ9ChKziAlIhGJSOQ/IH74q9zIsvCIlqnxSBKLxiMRLNiANvRBjMWjkThxA0ehwRqpb9d8WGgu0sgJ+bh6lYozMsJ9F7wUKtDT18cFfLmrpoxSa//43TdpkyOD3n/9FQ2gWMh05jU2AAAAAElFTkSuQmCC" />`
  }

  return html`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=${size} height=${size} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="11" fill="#5B3ADF" />
    <rect x="20" y="20" width="60" height="60" fill="url(#pattern0)" />
    <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_308_142" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_308_142" width="90" height="90" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADO0lEQVR4nO3dy28OURgG8Od1jYTERliyZmPFCon6E2rJzlYkpSFBIhFlg0SEBZHY4T+oLtjR0I3bjjYq4haCRW8ei+lJ2/h8ncs535kz8/zW05n3PJnON+9czgAiIiIiIiJNRHINyYskP5D8TPIyyU2x62ockkP81w+SJ0mui11fY8zvyf/znuQRkitj15m8LiEv9opkf+xak5YzaGeY5M7YNSepYNAk+YfkPZLbYteelBJBO1Mkr5LcGHsMSagQtPOV5CDJtbHHUmsegnbekTxE0mKPqZY8Bu08Ibkn9rhqJ0DQzjDJHbHHVxsBgybJaZI3SW6OPc7oAgft/GLW6m+IPd5oehS0096WvsdBO0m29JVOp0jSVyEljAA4bmZjEWvIbUXsAirYD+AZE2npUw4ayP4j+wG8Yc1b+pQPHZ18A3AJwBUzm4pdzGJNC9oZB3AGwF0zq0WNTQ3aGQUwYGaPYxfS9KCdhwCOmdmLWAWk/mOYVx+AMWYt/ZYYBbRlj17sN4BrAM6b2c9ebbSNQTuTAM4BuGVmc6E31uagndcAzprZ/ZAbUdALRgCcMLPnIVauoJcigAcABs3src8Vt+WsI69gLb326O68tfQKOp8JAKdRoaVX0MWMIrsG/qjoHyrocgq39Aq6vBkA15GdEk4vt/Cq8PU01moARwHMAhhYbmHt0dV9MbNlXyfReXSPKOjq7uRZSMfo8maQXW49lWdhBV1O4dM7HTqKGQWwz8wOFL0tpqDzmQBwGMCuMl0hoEPHcrxdVFLQnU0DuIHszst3HytU0EsFu/CvoBcEfTpVP4bZzdmDZtYX8hHgNu/RPX3coI1BR3mApk1BzwK4jexM4mOvN96WoPWQY2BPAewt0zL71tSgx5G1zLvr8Gw00LxDR21frWhK0N5bZt9SDzpYy+xbykEn9UJnJcFeQu4uyVeUK+lxwHrpPjA3jcT62OONJnDAmhjFCRjyMMntscdXGwEC1uRVnXgMWNOxdeMhYE0wmEeFgDVlZhElAp5jNmPM1ti1J6VgyJrWuKycAb9k21pm30hOdgm4vS2zbyQvdAhYH1PwjdnnQYbm9+xP1OdBRERERERE0vMXJpFNRw3I8BwAAAAASUVORK5CYII=" />
    </defs>
  </svg>`
}

@customElement('runme-button')
export class RunmeButton extends BaseClass {
  repository = ''
  file = DEFAULT_FILE_TO_OPEN
  variant: Variant = 'badge'

  render() {
    if (!this.repository) {
      return html``
    }

    const filename = this.file.split('/').pop() || 'markdown'
    const fileToOpen = encodeURIComponent(this.file)
    const img = this.variant === 'minified' ? runmeLogoImage() : runmeBadgeImage(filename)

    if (this.variant === 'listItem') {
      return html`<div class="listItem">
        ${runmeLogoImage(16)}
        Checkout with Runme
      </div>`
    }

    return html`<a
      href="${getVSCodeHref(this.repository, fileToOpen)}"
      class=${this.variant}
      target="_blank"
    >
      ${img}
    </a>`
  }

  static styles = css`
    a {
      margin: 0 5px 0 0;
      display: inline-block;
    }
    a.minified {
      border: 1px solid var(--color-btn-border);
      padding: 3px 6px 1px;
      border-radius: 6px;
      background-color: var(--color-btn-bg);
      box-shadow: var(--color-btn-shadow),var(--color-btn-inset-shadow);
      transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
      transition-property: color,background-color,box-shadow,border-color;
    }
    a.minified:hover {
      background-color: var(--color-btn-hover-bg);
      border-color: var(--color-btn-hover-border);
      transition-duration: .1s;
    }
    div.listItem {
      text-decoration: none;
      transform: translateY(-2px);
    }
    @media (prefers-color-scheme: light) {
      div.listItem {
        color: #000000;
      }
    }
    @media (prefers-color-scheme: dark) {
      div.listItem {
        color: #c9d1d9;
      }
    }
    div.listItem svg {
      transform: translateY(3px);
      margin-right: 4px;
    }
    svg {
      margin: 4px 0 0;
    }
  `

  static getRenderString (data: TemplateResult) {
    const {strings, values} = data;
    const v = [...values, ''].map((e) => typeof e === 'object' ? RunmeButton.getRenderString(e as TemplateResult) : e )
    return strings.reduce((acc,s, i) => acc + s + v[i], '')
  }

  /**
   * render without using Web Components (needed for Firefox where this Web API is disabled)
   */
  static render (repository: string, file: string, variant: Variant) {
    /**
     * Firefox doesn't support web components in content scripts
     * see https://github.com/w3c/webextensions/issues/210/
     */
    if (isFirefox) {
      const elem = new RunmeButton()
      elem.repository = repository
      elem.file = file
      elem.variant = variant
      const wrapper = document.createElement('div')
      wrapper.className = 'runme-button'
      wrapper.innerHTML = RunmeButton.getRenderString(elem.render())

      /**
       * attach CSS if needed
       */
      if (document.styleSheets.length) {
        RunmeButton.styles.cssText
          .split('}')
          .map((rule) => rule.trim())
          .filter(Boolean)
          .map((rule) => '.runme-button ' + rule + ' }')
          .forEach(
            (rule) => document.styleSheets.item(0)!.insertRule(rule, 1)
          )
      }

      return wrapper
    }

    const runmeButton = document.createElement('runme-button')
    runmeButton.setAttribute('repository', repository)
    runmeButton.setAttribute('file', file)
    runmeButton.setAttribute('variant', variant || 'badge')
    return runmeButton
  }
}

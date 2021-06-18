import i18n from '../i18n'

let createButton = (id, name, label = null) => {
  let button = document.createElement('span')

  button.id = id
  button.classList.add(['tooltip'])

  button.innerHTML =
    name === 'exit'
      ? `<img src="https://img.icons8.com/windows/17/000000/normal-screen.png"/>`
      : `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${name}"></use>
    </svg>`

  // Create text for tooltip
  let tooltipTextEl = document.createElement('span')
  tooltipTextEl.innerText = label
  tooltipTextEl.classList.add(
    ['left', 'right', 'side'].includes(name)
      ? ['tooltiptext_left']
      : ['tooltiptext_bottom']
  )
  button.appendChild(tooltipTextEl)

  return button
}

function createToolBarRBContainer(mind) {
  let locale = i18n[mind.locale] ? mind.locale : 'en'

  let toolBarRBContainer = document.createElement('toolbar')

  let efs = createButton('exitFull', 'exit', i18n[locale].exitFull)
  efs.setAttribute('style', 'display: none !important')

  let fc = createButton('fullscreen', 'full', i18n[locale].fullScreen)
  let gc = createButton('toCenter', 'living', i18n[locale].toCenter)
  let zo = createButton('zoomout', 'move', i18n[locale].zoomOut)
  let zi = createButton('zoomin', 'add', i18n[locale].zoomIn)
  let percentage = document.createElement('span')
  percentage.innerHTML = '100%'
  toolBarRBContainer.appendChild(fc)
  toolBarRBContainer.appendChild(efs)
  toolBarRBContainer.appendChild(gc)
  toolBarRBContainer.appendChild(zo)
  toolBarRBContainer.appendChild(zi)
  // toolBarRBContainer.appendChild(percentage)
  toolBarRBContainer.className = 'rb'
  fc.onclick = () => {
    mind.mindElixirBox
      .querySelector('.rb #exitFull')
      .setAttribute('style', 'display: block !important')
    mind.mindElixirBox
      .querySelector('.rb #fullscreen')
      .setAttribute('style', 'display: none !important')

    // when full screen mode is on, change the bg color;
    mind.mindElixirBox.style.background = '#fff'

    // Make element in full screen mode
    mind.mindElixirBox.requestFullscreen()
  }
  efs.onclick = () => {
    mind.mindElixirBox
      .querySelector('.rb #exitFull')
      .setAttribute('style', 'display: none !important')
    mind.mindElixirBox
      .querySelector('.rb #fullscreen')
      .setAttribute('style', 'display: block !important')

    // Exit element from full screen mode
    document.exitFullscreen()
  }
  gc.onclick = () => {
    mind.toCenter()
  }
  zo.onclick = () => {
    if (mind.scaleVal < 0.6) return
    mind.scale((mind.scaleVal -= 0.2))
  }
  zi.onclick = () => {
    if (mind.scaleVal > 1.6) return
    mind.scale((mind.scaleVal += 0.2))
  }

  document.addEventListener('fullscreenchange', event => {
    // Reset the transform scale
    mind.mindElixirBox.querySelector('.map-canvas').style.transform = 'scale(1)'

    // Reset the map's position
    mind.toCenter()
  })

  return toolBarRBContainer
}
function createToolBarLTContainer(mind) {
  let locale = i18n[mind.locale] ? mind.locale : 'en'
  let toolBarLTContainer = document.createElement('toolbar')
  let l = createButton('tbltl', 'left', i18n[locale].left)
  let r = createButton('tbltr', 'right', i18n[locale].right)
  let s = createButton('tblts', 'side', i18n[locale].side)

  toolBarLTContainer.appendChild(l)
  toolBarLTContainer.appendChild(r)
  toolBarLTContainer.appendChild(s)
  toolBarLTContainer.className = 'lt'
  l.onclick = () => {
    mind.initLeft()
  }
  r.onclick = () => {
    mind.initRight()
  }
  s.onclick = () => {
    mind.initSide()
  }
  return toolBarLTContainer
}

export default function (mind) {
  mind.container.append(createToolBarRBContainer(mind))
  mind.container.append(createToolBarLTContainer(mind))
}

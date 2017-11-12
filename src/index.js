import $ from 'jquery'

export default class Affogato {
  constructor () {
    this.target = null
    this.targetSelector = ''
    this.$layer = null
    this.layerATags = []
    this.linkStyles = {}

    let stage = document.querySelector('#affogato')
    if (!stage) {
      stage = document.createElement('div')
      stage.id = 'affogato'
      document.body.appendChild(stage)
    }
  }

  get $target () {
    return $(this.target || this.targetSelector)
  }

  get $stage () {
    return $('#affogato')
  }

  get affogatoATag () {
    return $('.affogato-layer-a')
  }

  updateLayer () {
    this.clearLayerATags()
    const base = this.$target[0]
    const { left, top, width, height } = base.getBoundingClientRect()
    this.$layer.css({
      position: 'fixed',
      left, top, width, height
    })
    this.hide()
    this.createLayerATags()
  }

  clearLayerATagsOwn () {
    for (let a of this.layerATags) $(a).remove()
    this.layerATags = []
  }

  // 他のAffogatoインスタンスによるaTagを消去する
  clearLayerATags () {
    const affogatoATags = this.affogatoATag
    const affogatoATagsOwn = this.layerATags
    for (let a of affogatoATags) {
      if (this.layerATags.indexOf(a) !== -1) continue
      $(a).remove()
    }
  }

  createLayerATags () {
    const links = this.$layer.find('.affogato-layer-link')
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      const url = link.dataset.href
      const { left, top, width, height } = link.getBoundingClientRect()
      
      const $a = $(`<a href='${url}' class='affogato-layer-a'></a>`)
      const styleAttrs = Object.keys(this.linkStyles)
      const style = {
        position: 'fixed',
        left, top, width, height
      }
      for (let attr of styleAttrs) {
        style[attr] = this.linkStyles[attr]
      }
      $a.css(style)
      $a.on('click', () => {
        // ドキュメント内のaffogatoによる全てのaTagを消す
        this.clearLayerATags()
      })
      this.$stage.append($a)
      this.layerATags.push($a[0])
    }
  }

  createLayer (links=[]) {
    this.$layer = $(`<div class='affogato-layer'></div>`)
    // 数値はパーセント
    const aTags = links
    for (let a of aTags) {
      const $div = $(`<div data-href='${a.href}' class='affogato-layer-link'></div>`)
      $div.css({
        position: 'absolute',
        display: 'inline-block',
        left: `${a.left}%`,
        top: `${a.top}%`,
        width: `${a.width}%`,
        height: `${a.height}%`
      })
      this.$layer.append($div)
    }
    this.$stage.append(this.$layer)
    this.updateLayer()
  }

  hide () {
    this.$layer.css({
      visibility: 'hidden'
    })
  }

  init ({ links }) {
    this.$target.on('mouseenter', event => {
      if ($(event.relatedTarget).hasClass('affogato-layer-a')) return
      if (!this.$layer) {
        this.createLayer(links)
      } else {
        this.updateLayer()
      }

      this.$target.on('mouseleave', event => {
        if ($(event.relatedTarget).hasClass('affogato-layer-a')) return
        this.clearLayerATagsOwn()
      })

      this.$layer.on('mouseleave', event => {
        this.hide()
      })

      $(window).on('scroll', () => {
        this.rerender()
      })

    })
  }

  setTargetSelector (selector='') {
    this.targetSelector = selector
  }

  setLinkStyle (styles={}) {
    this.linkStyles = styles
  }

  rerender () {
    this.clearLayerATagsOwn()
    this.updateLayer()
  }
}

import $ from 'jquery'

export default class Affogato {
  constructor () {
    this.links = []
    this.target = null
    this.targetSelector = ''
    this.$layer = null
    this.layerATags = []
    this.linkStyles = {}
    this.scrollTimer = null

    let stage = document.querySelector('#affogato')
    if (!stage) {
      stage = document.createElement('div')
      stage.id = 'affogato'
      document.body.appendChild(stage)
    }
  }

  static clearAll () {
    $('.affogato-layer').remove()
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

  // linksを配置する位置を決定する
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

  // XXX: 使用注意
  _hideLayerATagOwn () {
    for (let a of this.layerATags) $(a).hide()
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

  createLayer (links = []) {
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

  get isLinksVisible () {
    return this.layerATags.length > 0
  }

  showLayer () {
    if (!this.$layer) {
      this.createLayer(this.links)
    } else {
      this.updateLayer()
    }
  }

  showLinks () {
    this.$target.trigger('mouseenter')
  }

  init ({ links, visible } = { links: [] }) {
    this.links = links
    this.$target.on('mouseenter', event => {
      if ($(event.relatedTarget).hasClass('affogato-layer-a')) return
      this.clearLayerATagsOwn()
      this.showLayer()

      this.$target.on('mouseleave', event => {
        if ($(event.relatedTarget).hasClass('affogato-layer-a')) return
        this.clearLayerATagsOwn()
      })

      this.$layer.on('mouseleave', event => {
        this.hide()
      })

      $(window).on('scroll', () => {
        this._hideLayerATagOwn()
        this.onScrollStop(() => {
          if (this.isLinksVisible) this.rerender()
        })
      })
    })
  }

  onScrollStop (callback) {
    if (this.scrollTimer) window.clearTimeout(this.scrollTimer)
    this.scrollTimer = window.setTimeout(() => {
      if (callback) callback()
    }, 200)
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

  static imgLoaded (selector, callback) {
    const img = $(selector)[0]
    requestAnimationFrame(() => {
      if (!img.width || img.width === 0) {
        requestAnimationFrame(() => { Affogato.imgLoaded(selector, callback) })
      } else {
        callback(selector)
      }
    })
  }
}

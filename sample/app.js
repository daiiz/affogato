window.Affogato = require('../')
var $ = require('jquery')

var affogatoPool = {}

var sample0 = () => {
  var selectors = ['#image0', '#image1', '#image2']
  for (let selector of selectors) {
    var a = new Affogato()
    a.setTargetSelector(selector)
    a.setLinkStyle({
      backgroundColor: 'rgb(75, 127, 245)',
      opacity: 0.15
    })
    a.init()
    affogatoPool[selector] = a
  }
}

$(function () {
  sample0()

  var i = 0
  $('#image0').on('click', ({ target }) => {
    var t = (i % 2 === 0) ? 2 : 1
    $(target).css({
      width: 300 * t,
      height: 300 * t
    })
    i += 1
    affogatoPool['#image0'].rerender()
  })
})
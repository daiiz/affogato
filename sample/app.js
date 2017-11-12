window.Affogato = require('../')

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
  }
}

sample0()
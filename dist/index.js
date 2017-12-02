'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Affogato = function () {
  function Affogato() {
    _classCallCheck(this, Affogato);

    this.links = [];
    this.target = null;
    this.targetSelector = '';
    this.$layer = null;
    this.layerATags = [];
    this.linkStyles = {};
    this.scrollTimer = null;

    var stage = document.querySelector('#affogato');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'affogato';
      document.body.appendChild(stage);
    }
  }

  _createClass(Affogato, [{
    key: 'updateLayer',


    // linksを配置する位置を決定する
    value: function updateLayer() {
      this.clearLayerATags();
      var base = this.$target[0];

      var _base$getBoundingClie = base.getBoundingClientRect(),
          left = _base$getBoundingClie.left,
          top = _base$getBoundingClie.top,
          width = _base$getBoundingClie.width,
          height = _base$getBoundingClie.height;

      this.$layer.css({
        position: 'fixed',
        left: left, top: top, width: width, height: height
      });
      this.hide();
      this.createLayerATags();
    }
  }, {
    key: 'clearLayerATagsOwn',
    value: function clearLayerATagsOwn() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.layerATags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var a = _step.value;
          (0, _jquery2.default)(a).remove();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.layerATags = [];
    }

    // XXX: 使用注意

  }, {
    key: '_hideLayerATagOwn',
    value: function _hideLayerATagOwn() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.layerATags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var a = _step2.value;
          (0, _jquery2.default)(a).hide();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    // 他のAffogatoインスタンスによるaTagを消去する

  }, {
    key: 'clearLayerATags',
    value: function clearLayerATags() {
      var affogatoATags = this.affogatoATag;
      var affogatoATagsOwn = this.layerATags;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = affogatoATags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var a = _step3.value;

          if (this.layerATags.indexOf(a) !== -1) continue;
          (0, _jquery2.default)(a).remove();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'createLayerATags',
    value: function createLayerATags() {
      var _this = this;

      var links = this.$layer.find('.affogato-layer-link');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var url = link.dataset.href;

        var _link$getBoundingClie = link.getBoundingClientRect(),
            left = _link$getBoundingClie.left,
            top = _link$getBoundingClie.top,
            width = _link$getBoundingClie.width,
            height = _link$getBoundingClie.height;

        var $a = (0, _jquery2.default)('<a href=\'' + url + '\' class=\'affogato-layer-a\'></a>');
        var styleAttrs = Object.keys(this.linkStyles);
        var style = {
          position: 'fixed',
          left: left, top: top, width: width, height: height
        };
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = styleAttrs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var attr = _step4.value;

            style[attr] = this.linkStyles[attr];
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        $a.css(style);
        $a.on('click', function () {
          // ドキュメント内のaffogatoによる全てのaTagを消す
          _this.clearLayerATags();
        });
        this.$stage.append($a);
        this.layerATags.push($a[0]);
      }
    }
  }, {
    key: 'createLayer',
    value: function createLayer() {
      var links = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.$layer = (0, _jquery2.default)('<div class=\'affogato-layer\'></div>');
      // 数値はパーセント
      var aTags = links;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = aTags[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var a = _step5.value;

          var $div = (0, _jquery2.default)('<div data-href=\'' + a.href + '\' class=\'affogato-layer-link\'></div>');
          $div.css({
            position: 'absolute',
            display: 'inline-block',
            left: a.left + '%',
            top: a.top + '%',
            width: a.width + '%',
            height: a.height + '%'
          });
          this.$layer.append($div);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.$stage.append(this.$layer);
      this.updateLayer();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.$layer.css({
        visibility: 'hidden'
      });
    }
  }, {
    key: 'showLayer',
    value: function showLayer() {
      if (!this.$layer) {
        this.createLayer(this.links);
      } else {
        this.updateLayer();
      }
    }
  }, {
    key: 'showLinks',
    value: function showLinks() {
      this.$target.trigger('mouseenter');
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { links: [] },
          links = _ref.links,
          visible = _ref.visible;

      this.links = links;
      this.$target.on('mouseenter', function (event) {
        if ((0, _jquery2.default)(event.relatedTarget).hasClass('affogato-layer-a')) return;
        _this2.clearLayerATagsOwn();
        _this2.showLayer();

        _this2.$target.on('mouseleave', function (event) {
          if ((0, _jquery2.default)(event.relatedTarget).hasClass('affogato-layer-a')) return;
          _this2.clearLayerATagsOwn();
        });

        _this2.$layer.on('mouseleave', function (event) {
          _this2.hide();
        });

        (0, _jquery2.default)(window).on('scroll', function () {
          _this2._hideLayerATagOwn();
          _this2.onScrollStop(function () {
            if (_this2.isLinksVisible) _this2.rerender();
          });
        });
      });
    }
  }, {
    key: 'onScrollStop',
    value: function onScrollStop(callback) {
      if (this.scrollTimer) window.clearTimeout(this.scrollTimer);
      this.scrollTimer = window.setTimeout(function () {
        if (callback) callback();
      }, 200);
    }
  }, {
    key: 'setTargetSelector',
    value: function setTargetSelector() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.targetSelector = selector;
    }
  }, {
    key: 'setLinkStyle',
    value: function setLinkStyle() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.linkStyles = styles;
    }
  }, {
    key: 'rerender',
    value: function rerender() {
      this.clearLayerATagsOwn();
      this.updateLayer();
    }
  }, {
    key: '$target',
    get: function get() {
      return (0, _jquery2.default)(this.target || this.targetSelector);
    }
  }, {
    key: '$stage',
    get: function get() {
      return (0, _jquery2.default)('#affogato');
    }
  }, {
    key: 'affogatoATag',
    get: function get() {
      return (0, _jquery2.default)('.affogato-layer-a');
    }
  }, {
    key: 'isLinksVisible',
    get: function get() {
      return this.layerATags.length > 0;
    }
  }], [{
    key: 'clearAll',
    value: function clearAll() {
      (0, _jquery2.default)('.affogato-layer').remove();
    }
  }, {
    key: 'imgLoaded',
    value: function imgLoaded(selector, callback) {
      var img = (0, _jquery2.default)(selector)[0];
      requestAnimationFrame(function () {
        if (!img.width || img.width === 0) {
          requestAnimationFrame(function () {
            Affogato.imgLoaded(selector, callback);
          });
        } else {
          callback(selector);
        }
      });
    }
  }]);

  return Affogato;
}();

exports.default = Affogato;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBZmZvZ2F0byIsImxpbmtzIiwidGFyZ2V0IiwidGFyZ2V0U2VsZWN0b3IiLCIkbGF5ZXIiLCJsYXllckFUYWdzIiwibGlua1N0eWxlcyIsInNjcm9sbFRpbWVyIiwic3RhZ2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGVhckxheWVyQVRhZ3MiLCJiYXNlIiwiJHRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsImNzcyIsInBvc2l0aW9uIiwiaGlkZSIsImNyZWF0ZUxheWVyQVRhZ3MiLCJhIiwicmVtb3ZlIiwiYWZmb2dhdG9BVGFncyIsImFmZm9nYXRvQVRhZyIsImFmZm9nYXRvQVRhZ3NPd24iLCJpbmRleE9mIiwiZmluZCIsImkiLCJsZW5ndGgiLCJsaW5rIiwidXJsIiwiZGF0YXNldCIsImhyZWYiLCIkYSIsInN0eWxlQXR0cnMiLCJPYmplY3QiLCJrZXlzIiwic3R5bGUiLCJhdHRyIiwib24iLCIkc3RhZ2UiLCJhcHBlbmQiLCJwdXNoIiwiYVRhZ3MiLCIkZGl2IiwiZGlzcGxheSIsInVwZGF0ZUxheWVyIiwidmlzaWJpbGl0eSIsImNyZWF0ZUxheWVyIiwidHJpZ2dlciIsInZpc2libGUiLCJldmVudCIsInJlbGF0ZWRUYXJnZXQiLCJoYXNDbGFzcyIsImNsZWFyTGF5ZXJBVGFnc093biIsInNob3dMYXllciIsIndpbmRvdyIsIl9oaWRlTGF5ZXJBVGFnT3duIiwib25TY3JvbGxTdG9wIiwiaXNMaW5rc1Zpc2libGUiLCJyZXJlbmRlciIsImNhbGxiYWNrIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNlbGVjdG9yIiwic3R5bGVzIiwiaW1nIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW1nTG9hZGVkIl0sIm1hcHBpbmdzIjoiOzs7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c0JBQUUsbUJBQUYsQ0FBUDtBQUNEOzs7d0JBdUZxQjtBQUNwQixhQUFPLEtBQUtFLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixDQUFoQztBQUNEOzs7K0JBdkdrQjtBQUNqQiw0QkFBRSxpQkFBRixFQUFxQlAsTUFBckI7QUFDRDs7OzhCQWdLaUIyQyxRLEVBQVVILFEsRUFBVTtBQUNwQyxVQUFNSyxNQUFNLHNCQUFFRixRQUFGLEVBQVksQ0FBWixDQUFaO0FBQ0FHLDRCQUFzQixZQUFNO0FBQzFCLFlBQUksQ0FBQ0QsSUFBSXBELEtBQUwsSUFBY29ELElBQUlwRCxLQUFKLEtBQWMsQ0FBaEMsRUFBbUM7QUFDakNxRCxnQ0FBc0IsWUFBTTtBQUFFMUUscUJBQVMyRSxTQUFULENBQW1CSixRQUFuQixFQUE2QkgsUUFBN0I7QUFBd0MsV0FBdEU7QUFDRCxTQUZELE1BRU87QUFDTEEsbUJBQVNHLFFBQVQ7QUFDRDtBQUNGLE9BTkQ7QUFPRDs7Ozs7O2tCQTdMa0J2RSxRIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZmZvZ2F0byB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmxpbmtzID0gW11cbiAgICB0aGlzLnRhcmdldCA9IG51bGxcbiAgICB0aGlzLnRhcmdldFNlbGVjdG9yID0gJydcbiAgICB0aGlzLiRsYXllciA9IG51bGxcbiAgICB0aGlzLmxheWVyQVRhZ3MgPSBbXVxuICAgIHRoaXMubGlua1N0eWxlcyA9IHt9XG4gICAgdGhpcy5zY3JvbGxUaW1lciA9IG51bGxcblxuICAgIGxldCBzdGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZmZvZ2F0bycpXG4gICAgaWYgKCFzdGFnZSkge1xuICAgICAgc3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgc3RhZ2UuaWQgPSAnYWZmb2dhdG8nXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YWdlKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbGVhckFsbCAoKSB7XG4gICAgJCgnLmFmZm9nYXRvLWxheWVyJykucmVtb3ZlKClcbiAgfVxuXG4gIGdldCAkdGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLnRhcmdldCB8fCB0aGlzLnRhcmdldFNlbGVjdG9yKVxuICB9XG5cbiAgZ2V0ICRzdGFnZSAoKSB7XG4gICAgcmV0dXJuICQoJyNhZmZvZ2F0bycpXG4gIH1cblxuICBnZXQgYWZmb2dhdG9BVGFnICgpIHtcbiAgICByZXR1cm4gJCgnLmFmZm9nYXRvLWxheWVyLWEnKVxuICB9XG5cbiAgLy8gbGlua3PjgpLphY3nva7jgZnjgovkvY3nva7jgpLmsbrlrprjgZnjgotcbiAgdXBkYXRlTGF5ZXIgKCkge1xuICAgIHRoaXMuY2xlYXJMYXllckFUYWdzKClcbiAgICBjb25zdCBiYXNlID0gdGhpcy4kdGFyZ2V0WzBdXG4gICAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGJhc2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLiRsYXllci5jc3Moe1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHRcbiAgICB9KVxuICAgIHRoaXMuaGlkZSgpXG4gICAgdGhpcy5jcmVhdGVMYXllckFUYWdzKClcbiAgfVxuXG4gIGNsZWFyTGF5ZXJBVGFnc093biAoKSB7XG4gICAgZm9yIChsZXQgYSBvZiB0aGlzLmxheWVyQVRhZ3MpICQoYSkucmVtb3ZlKClcbiAgICB0aGlzLmxheWVyQVRhZ3MgPSBbXVxuICB9XG5cbiAgLy8gWFhYOiDkvb/nlKjms6jmhI9cbiAgX2hpZGVMYXllckFUYWdPd24gKCkge1xuICAgIGZvciAobGV0IGEgb2YgdGhpcy5sYXllckFUYWdzKSAkKGEpLmhpZGUoKVxuICB9XG5cbiAgLy8g5LuW44GuQWZmb2dhdG/jgqTjg7Pjgrnjgr/jg7PjgrnjgavjgojjgothVGFn44KS5raI5Y6744GZ44KLXG4gIGNsZWFyTGF5ZXJBVGFncyAoKSB7XG4gICAgY29uc3QgYWZmb2dhdG9BVGFncyA9IHRoaXMuYWZmb2dhdG9BVGFnXG4gICAgY29uc3QgYWZmb2dhdG9BVGFnc093biA9IHRoaXMubGF5ZXJBVGFnc1xuICAgIGZvciAobGV0IGEgb2YgYWZmb2dhdG9BVGFncykge1xuICAgICAgaWYgKHRoaXMubGF5ZXJBVGFncy5pbmRleE9mKGEpICE9PSAtMSkgY29udGludWVcbiAgICAgICQoYSkucmVtb3ZlKClcbiAgICB9XG4gIH1cblxuICBjcmVhdGVMYXllckFUYWdzICgpIHtcbiAgICBjb25zdCBsaW5rcyA9IHRoaXMuJGxheWVyLmZpbmQoJy5hZmZvZ2F0by1sYXllci1saW5rJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsaW5rID0gbGlua3NbaV1cbiAgICAgIGNvbnN0IHVybCA9IGxpbmsuZGF0YXNldC5ocmVmXG4gICAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gbGluay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICBjb25zdCAkYSA9ICQoYDxhIGhyZWY9JyR7dXJsfScgY2xhc3M9J2FmZm9nYXRvLWxheWVyLWEnPjwvYT5gKVxuICAgICAgY29uc3Qgc3R5bGVBdHRycyA9IE9iamVjdC5rZXlzKHRoaXMubGlua1N0eWxlcylcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBhdHRyIG9mIHN0eWxlQXR0cnMpIHtcbiAgICAgICAgc3R5bGVbYXR0cl0gPSB0aGlzLmxpbmtTdHlsZXNbYXR0cl1cbiAgICAgIH1cbiAgICAgICRhLmNzcyhzdHlsZSlcbiAgICAgICRhLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI5YaF44GuYWZmb2dhdG/jgavjgojjgovlhajjgabjga5hVGFn44KS5raI44GZXG4gICAgICAgIHRoaXMuY2xlYXJMYXllckFUYWdzKClcbiAgICAgIH0pXG4gICAgICB0aGlzLiRzdGFnZS5hcHBlbmQoJGEpXG4gICAgICB0aGlzLmxheWVyQVRhZ3MucHVzaCgkYVswXSlcbiAgICB9XG4gIH1cblxuICBjcmVhdGVMYXllciAobGlua3MgPSBbXSkge1xuICAgIHRoaXMuJGxheWVyID0gJChgPGRpdiBjbGFzcz0nYWZmb2dhdG8tbGF5ZXInPjwvZGl2PmApXG4gICAgLy8g5pWw5YCk44Gv44OR44O844K744Oz44OIXG4gICAgY29uc3QgYVRhZ3MgPSBsaW5rc1xuICAgIGZvciAobGV0IGEgb2YgYVRhZ3MpIHtcbiAgICAgIGNvbnN0ICRkaXYgPSAkKGA8ZGl2IGRhdGEtaHJlZj0nJHthLmhyZWZ9JyBjbGFzcz0nYWZmb2dhdG8tbGF5ZXItbGluayc+PC9kaXY+YClcbiAgICAgICRkaXYuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBsZWZ0OiBgJHthLmxlZnR9JWAsXG4gICAgICAgIHRvcDogYCR7YS50b3B9JWAsXG4gICAgICAgIHdpZHRoOiBgJHthLndpZHRofSVgLFxuICAgICAgICBoZWlnaHQ6IGAke2EuaGVpZ2h0fSVgXG4gICAgICB9KVxuICAgICAgdGhpcy4kbGF5ZXIuYXBwZW5kKCRkaXYpXG4gICAgfVxuICAgIHRoaXMuJHN0YWdlLmFwcGVuZCh0aGlzLiRsYXllcilcbiAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgfVxuXG4gIGhpZGUgKCkge1xuICAgIHRoaXMuJGxheWVyLmNzcyh7XG4gICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgIH0pXG4gIH1cblxuICBnZXQgaXNMaW5rc1Zpc2libGUgKCkge1xuICAgIHJldHVybiB0aGlzLmxheWVyQVRhZ3MubGVuZ3RoID4gMFxuICB9XG5cbiAgc2hvd0xheWVyICgpIHtcbiAgICBpZiAoIXRoaXMuJGxheWVyKSB7XG4gICAgICB0aGlzLmNyZWF0ZUxheWVyKHRoaXMubGlua3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXIoKVxuICAgIH1cbiAgfVxuXG4gIHNob3dMaW5rcyAoKSB7XG4gICAgdGhpcy4kdGFyZ2V0LnRyaWdnZXIoJ21vdXNlZW50ZXInKVxuICB9XG5cbiAgaW5pdCAoeyBsaW5rcywgdmlzaWJsZSB9ID0geyBsaW5rczogW10gfSkge1xuICAgIHRoaXMubGlua3MgPSBsaW5rc1xuICAgIHRoaXMuJHRhcmdldC5vbignbW91c2VlbnRlcicsIGV2ZW50ID0+IHtcbiAgICAgIGlmICgkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLmhhc0NsYXNzKCdhZmZvZ2F0by1sYXllci1hJykpIHJldHVyblxuICAgICAgdGhpcy5jbGVhckxheWVyQVRhZ3NPd24oKVxuICAgICAgdGhpcy5zaG93TGF5ZXIoKVxuXG4gICAgICB0aGlzLiR0YXJnZXQub24oJ21vdXNlbGVhdmUnLCBldmVudCA9PiB7XG4gICAgICAgIGlmICgkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLmhhc0NsYXNzKCdhZmZvZ2F0by1sYXllci1hJykpIHJldHVyblxuICAgICAgICB0aGlzLmNsZWFyTGF5ZXJBVGFnc093bigpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLiRsYXllci5vbignbW91c2VsZWF2ZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgIH0pXG5cbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oaWRlTGF5ZXJBVGFnT3duKClcbiAgICAgICAgdGhpcy5vblNjcm9sbFN0b3AoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzTGlua3NWaXNpYmxlKSB0aGlzLnJlcmVuZGVyKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIG9uU2Nyb2xsU3RvcCAoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5zY3JvbGxUaW1lcikgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVyKVxuICAgIHRoaXMuc2Nyb2xsVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKClcbiAgICB9LCAyMDApXG4gIH1cblxuICBzZXRUYXJnZXRTZWxlY3RvciAoc2VsZWN0b3I9JycpIHtcbiAgICB0aGlzLnRhcmdldFNlbGVjdG9yID0gc2VsZWN0b3JcbiAgfVxuXG4gIHNldExpbmtTdHlsZSAoc3R5bGVzPXt9KSB7XG4gICAgdGhpcy5saW5rU3R5bGVzID0gc3R5bGVzXG4gIH1cblxuICByZXJlbmRlciAoKSB7XG4gICAgdGhpcy5jbGVhckxheWVyQVRhZ3NPd24oKVxuICAgIHRoaXMudXBkYXRlTGF5ZXIoKVxuICB9XG5cbiAgc3RhdGljIGltZ0xvYWRlZCAoc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW1nID0gJChzZWxlY3RvcilbMF1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCFpbWcud2lkdGggfHwgaW1nLndpZHRoID09PSAwKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7IEFmZm9nYXRvLmltZ0xvYWRlZChzZWxlY3RvciwgY2FsbGJhY2spIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhzZWxlY3RvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=
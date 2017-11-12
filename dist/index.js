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

    this.target = null;
    this.targetSelector = '';
    this.$layer = null;
    this.layerATags = [];
    this.linkStyles = {};

    var stage = document.querySelector('#affogato');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'affogato';
      document.body.appendChild(stage);
    }
  }

  _createClass(Affogato, [{
    key: 'updateLayer',
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

    // 他のAffogatoインスタンスによるaTagを消去する

  }, {
    key: 'clearLayerATags',
    value: function clearLayerATags() {
      var affogatoATags = this.affogatoATag;
      var affogatoATagsOwn = this.layerATags;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = affogatoATags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var a = _step2.value;

          if (this.layerATags.indexOf(a) !== -1) continue;
          (0, _jquery2.default)(a).remove();
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = styleAttrs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var attr = _step3.value;

            style[attr] = this.linkStyles[attr];
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
      this.$layer = (0, _jquery2.default)('<div class=\'affogato-layer\'></div>');
      // 数値はパーセント
      var aTags = [{ left: 10, top: 10, width: 20, height: 20, href: '#' }, { left: 40, top: 40, width: 30, height: 10, href: '' }];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = aTags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var a = _step4.value;

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
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.$target.on('mouseenter', function (event) {
        if ((0, _jquery2.default)(event.relatedTarget).hasClass('affogato-layer-a')) return;
        if (!_this2.$layer) {
          _this2.createLayer();
        } else {
          _this2.updateLayer();
        }

        _this2.$target.on('mouseleave', function (event) {
          if ((0, _jquery2.default)(event.relatedTarget).hasClass('affogato-layer-a')) return;
          _this2.clearLayerATagsOwn();
        });

        _this2.$layer.on('mouseleave', function (event) {
          _this2.hide();
        });

        (0, _jquery2.default)(window).on('scroll', function () {
          _this2.rerender();
        });
      });
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
  }]);

  return Affogato;
}();

exports.default = Affogato;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBZmZvZ2F0byIsInRhcmdldCIsInRhcmdldFNlbGVjdG9yIiwiJGxheWVyIiwibGF5ZXJBVGFncyIsImxpbmtTdHlsZXMiLCJzdGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsZWFyTGF5ZXJBVGFncyIsImJhc2UiLCIkdGFyZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiY3NzIiwicG9zaXRpb24iLCJoaWRlIiwiY3JlYXRlTGF5ZXJBVGFncyIsImEiLCJyZW1vdmUiLCJhZmZvZ2F0b0FUYWdzIiwiYWZmb2dhdG9BVGFnIiwiYWZmb2dhdG9BVGFnc093biIsImluZGV4T2YiLCJsaW5rcyIsImZpbmQiLCJpIiwibGVuZ3RoIiwibGluayIsInVybCIsImRhdGFzZXQiLCJocmVmIiwiJGEiLCJzdHlsZUF0dHJzIiwiT2JqZWN0Iiwia2V5cyIsInN0eWxlIiwiYXR0ciIsIm9uIiwiJHN0YWdlIiwiYXBwZW5kIiwicHVzaCIsImFUYWdzIiwiJGRpdiIsImRpc3BsYXkiLCJ1cGRhdGVMYXllciIsInZpc2liaWxpdHkiLCJldmVudCIsInJlbGF0ZWRUYXJnZXQiLCJoYXNDbGFzcyIsImNyZWF0ZUxheWVyIiwiY2xlYXJMYXllckFUYWdzT3duIiwid2luZG93IiwicmVyZW5kZXIiLCJzZWxlY3RvciIsInN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBLFE7QUFDbkIsc0JBQWU7QUFBQTs7QUFDYixTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsRUFBdEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxC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QkFsSWM7QUFDYixhQUFPLHNCQUFFLEtBQUtuRCxNQUFMLElBQWUsS0FBS0MsY0FBdEIsQ0FBUDtBQUNEOzs7d0JBRWE7QUFDWixhQUFPLHNCQUFFLFdBQUYsQ0FBUDtBQUNEOzs7d0JBRW1CO0FBQ2xCLGFBQU8sc0JBQUUsbUJBQUYsQ0FBUDtBQUNEOzs7Ozs7a0JBMUJrQkYsUSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWZmb2dhdG8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy50YXJnZXQgPSBudWxsXG4gICAgdGhpcy50YXJnZXRTZWxlY3RvciA9ICcnXG4gICAgdGhpcy4kbGF5ZXIgPSBudWxsXG4gICAgdGhpcy5sYXllckFUYWdzID0gW11cbiAgICB0aGlzLmxpbmtTdHlsZXMgPSB7fVxuXG4gICAgbGV0IHN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FmZm9nYXRvJylcbiAgICBpZiAoIXN0YWdlKSB7XG4gICAgICBzdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBzdGFnZS5pZCA9ICdhZmZvZ2F0bydcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhZ2UpXG4gICAgfVxuICB9XG5cbiAgZ2V0ICR0YXJnZXQgKCkge1xuICAgIHJldHVybiAkKHRoaXMudGFyZ2V0IHx8IHRoaXMudGFyZ2V0U2VsZWN0b3IpXG4gIH1cblxuICBnZXQgJHN0YWdlICgpIHtcbiAgICByZXR1cm4gJCgnI2FmZm9nYXRvJylcbiAgfVxuXG4gIGdldCBhZmZvZ2F0b0FUYWcgKCkge1xuICAgIHJldHVybiAkKCcuYWZmb2dhdG8tbGF5ZXItYScpXG4gIH1cblxuICB1cGRhdGVMYXllciAoKSB7XG4gICAgdGhpcy5jbGVhckxheWVyQVRhZ3MoKVxuICAgIGNvbnN0IGJhc2UgPSB0aGlzLiR0YXJnZXRbMF1cbiAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gYmFzZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuJGxheWVyLmNzcyh7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodFxuICAgIH0pXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLmNyZWF0ZUxheWVyQVRhZ3MoKVxuICB9XG5cbiAgY2xlYXJMYXllckFUYWdzT3duICgpIHtcbiAgICBmb3IgKGxldCBhIG9mIHRoaXMubGF5ZXJBVGFncykgJChhKS5yZW1vdmUoKVxuICAgIHRoaXMubGF5ZXJBVGFncyA9IFtdXG4gIH1cblxuICAvLyDku5bjga5BZmZvZ2F0b+OCpOODs+OCueOCv+ODs+OCueOBq+OCiOOCi2FUYWfjgpLmtojljrvjgZnjgotcbiAgY2xlYXJMYXllckFUYWdzICgpIHtcbiAgICBjb25zdCBhZmZvZ2F0b0FUYWdzID0gdGhpcy5hZmZvZ2F0b0FUYWdcbiAgICBjb25zdCBhZmZvZ2F0b0FUYWdzT3duID0gdGhpcy5sYXllckFUYWdzXG4gICAgZm9yIChsZXQgYSBvZiBhZmZvZ2F0b0FUYWdzKSB7XG4gICAgICBpZiAodGhpcy5sYXllckFUYWdzLmluZGV4T2YoYSkgIT09IC0xKSBjb250aW51ZVxuICAgICAgJChhKS5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUxheWVyQVRhZ3MgKCkge1xuICAgIGNvbnN0IGxpbmtzID0gdGhpcy4kbGF5ZXIuZmluZCgnLmFmZm9nYXRvLWxheWVyLWxpbmsnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpbmsgPSBsaW5rc1tpXVxuICAgICAgY29uc3QgdXJsID0gbGluay5kYXRhc2V0LmhyZWZcbiAgICAgIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBsaW5rLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBcbiAgICAgIGNvbnN0ICRhID0gJChgPGEgaHJlZj0nJHt1cmx9JyBjbGFzcz0nYWZmb2dhdG8tbGF5ZXItYSc+PC9hPmApXG4gICAgICBjb25zdCBzdHlsZUF0dHJzID0gT2JqZWN0LmtleXModGhpcy5saW5rU3R5bGVzKVxuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHRcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGF0dHIgb2Ygc3R5bGVBdHRycykge1xuICAgICAgICBzdHlsZVthdHRyXSA9IHRoaXMubGlua1N0eWxlc1thdHRyXVxuICAgICAgfVxuICAgICAgJGEuY3NzKHN0eWxlKVxuICAgICAgJGEub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyDjg4njgq3jg6Xjg6Hjg7Pjg4jlhoXjga5hZmZvZ2F0b+OBq+OCiOOCi+WFqOOBpuOBrmFUYWfjgpLmtojjgZlcbiAgICAgICAgdGhpcy5jbGVhckxheWVyQVRhZ3MoKVxuICAgICAgfSlcbiAgICAgIHRoaXMuJHN0YWdlLmFwcGVuZCgkYSlcbiAgICAgIHRoaXMubGF5ZXJBVGFncy5wdXNoKCRhWzBdKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUxheWVyICgpIHtcbiAgICB0aGlzLiRsYXllciA9ICQoYDxkaXYgY2xhc3M9J2FmZm9nYXRvLWxheWVyJz48L2Rpdj5gKVxuICAgIC8vIOaVsOWApOOBr+ODkeODvOOCu+ODs+ODiFxuICAgIGNvbnN0IGFUYWdzID0gW1xuICAgICAgeyBsZWZ0OiAxMCwgdG9wOiAxMCwgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBocmVmOiAnIycgfSxcbiAgICAgIHsgbGVmdDogNDAsIHRvcDogNDAsIHdpZHRoOiAzMCwgaGVpZ2h0OiAxMCwgaHJlZjogJycgfSxcbiAgICBdXG4gICAgZm9yIChsZXQgYSBvZiBhVGFncykge1xuICAgICAgY29uc3QgJGRpdiA9ICQoYDxkaXYgZGF0YS1ocmVmPScke2EuaHJlZn0nIGNsYXNzPSdhZmZvZ2F0by1sYXllci1saW5rJz48L2Rpdj5gKVxuICAgICAgJGRpdi5jc3Moe1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgIGxlZnQ6IGAke2EubGVmdH0lYCxcbiAgICAgICAgdG9wOiBgJHthLnRvcH0lYCxcbiAgICAgICAgd2lkdGg6IGAke2Eud2lkdGh9JWAsXG4gICAgICAgIGhlaWdodDogYCR7YS5oZWlnaHR9JWBcbiAgICAgIH0pXG4gICAgICB0aGlzLiRsYXllci5hcHBlbmQoJGRpdilcbiAgICB9XG4gICAgdGhpcy4kc3RhZ2UuYXBwZW5kKHRoaXMuJGxheWVyKVxuICAgIHRoaXMudXBkYXRlTGF5ZXIoKVxuICB9XG5cbiAgaGlkZSAoKSB7XG4gICAgdGhpcy4kbGF5ZXIuY3NzKHtcbiAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nXG4gICAgfSlcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuJHRhcmdldC5vbignbW91c2VlbnRlcicsIGV2ZW50ID0+IHtcbiAgICAgIGlmICgkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLmhhc0NsYXNzKCdhZmZvZ2F0by1sYXllci1hJykpIHJldHVyblxuICAgICAgaWYgKCF0aGlzLiRsYXllcikge1xuICAgICAgICB0aGlzLmNyZWF0ZUxheWVyKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXIoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLiR0YXJnZXQub24oJ21vdXNlbGVhdmUnLCBldmVudCA9PiB7XG4gICAgICAgIGlmICgkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLmhhc0NsYXNzKCdhZmZvZ2F0by1sYXllci1hJykpIHJldHVyblxuICAgICAgICB0aGlzLmNsZWFyTGF5ZXJBVGFnc093bigpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLiRsYXllci5vbignbW91c2VsZWF2ZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgIH0pXG5cbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnJlcmVuZGVyKClcbiAgICAgIH0pXG5cbiAgICB9KVxuICB9XG5cbiAgc2V0VGFyZ2V0U2VsZWN0b3IgKHNlbGVjdG9yPScnKSB7XG4gICAgdGhpcy50YXJnZXRTZWxlY3RvciA9IHNlbGVjdG9yXG4gIH1cblxuICBzZXRMaW5rU3R5bGUgKHN0eWxlcz17fSkge1xuICAgIHRoaXMubGlua1N0eWxlcyA9IHN0eWxlc1xuICB9XG5cbiAgcmVyZW5kZXIgKCkge1xuICAgIHRoaXMuY2xlYXJMYXllckFUYWdzT3duKClcbiAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgfVxufVxuIl19
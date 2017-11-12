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

        (0, _jquery2.default)(window).on('scroll', function () {
          _this2.clearLayerATagsOwn();
        });

        _this2.$layer.on('mouseleave', function (event) {
          _this2.hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBZmZvZ2F0byIsInRhcmdldCIsInRhcmdldFNlbGVjdG9yIiwiJGxheWVyIiwibGF5ZXJBVGFncyIsImxpbmtTdHlsZXMiLCJzdGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsZWFyTGF5ZXJBVGFncyIsImJhc2UiLCIkdGFyZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiY3NzIiwicG9zaXRpb24iLCJoaWRlIiwiY3JlYXRlTGF5ZXJBVGFncyIsImEiLCJyZW1vdmUiLCJhZmZvZ2F0b0FUYWdzIiwiYWZmb2dhdG9BVGFnIiwiYWZmb2dhdG9BVGFnc093biIsImluZGV4T2YiLCJsaW5rcyIsImZpbmQiLCJpIiwibGVuZ3RoIiwibGluayIsInVybCIsImRhdGFzZXQiLCJocmVmIiwiJGEiLCJzdHlsZUF0dHJzIiwiT2JqZWN0Iiwia2V5cyIsInN0eWxlIiwiYXR0ciIsIm9uIiwiJHN0YWdlIiwiYXBwZW5kIiwicHVzaCIsImFUYWdzIiwiJGRpdiIsImRpc3BsYXkiLCJ1cGRhdGVMYXllciIsInZpc2liaWxpdHkiLCJldmVudCIsInJlbGF0ZWRUYXJnZXQiLCJoYXNDbGFzcyIsImNyZWF0ZUxheWVyIiwiY2xlYXJMYXllckFUYWdzT3duIiwid2luZG93Iiwic2VsZWN0b3IiLCJzdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQSxRO0FBQ25CLHNCQUFlO0FBQUE7O0FBQ2IsU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxRQUFJ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QUFDRDs7O3dCQUVhO0FBQ1osYUFBTyxzQkFBRSxXQUFGLENBQVA7QUFDRDs7O3dCQUVtQjtBQUNsQixhQUFPLHNCQUFFLG1CQUFGLENBQVA7QUFDRDs7Ozs7O2tCQTFCa0JGLFEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFmZm9nYXRvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudGFyZ2V0ID0gbnVsbFxuICAgIHRoaXMudGFyZ2V0U2VsZWN0b3IgPSAnJ1xuICAgIHRoaXMuJGxheWVyID0gbnVsbFxuICAgIHRoaXMubGF5ZXJBVGFncyA9IFtdXG4gICAgdGhpcy5saW5rU3R5bGVzID0ge31cblxuICAgIGxldCBzdGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZmZvZ2F0bycpXG4gICAgaWYgKCFzdGFnZSkge1xuICAgICAgc3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgc3RhZ2UuaWQgPSAnYWZmb2dhdG8nXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YWdlKVxuICAgIH1cbiAgfVxuXG4gIGdldCAkdGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLnRhcmdldCB8fCB0aGlzLnRhcmdldFNlbGVjdG9yKVxuICB9XG5cbiAgZ2V0ICRzdGFnZSAoKSB7XG4gICAgcmV0dXJuICQoJyNhZmZvZ2F0bycpXG4gIH1cblxuICBnZXQgYWZmb2dhdG9BVGFnICgpIHtcbiAgICByZXR1cm4gJCgnLmFmZm9nYXRvLWxheWVyLWEnKVxuICB9XG5cbiAgdXBkYXRlTGF5ZXIgKCkge1xuICAgIHRoaXMuY2xlYXJMYXllckFUYWdzKClcbiAgICBjb25zdCBiYXNlID0gdGhpcy4kdGFyZ2V0WzBdXG4gICAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGJhc2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLiRsYXllci5jc3Moe1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHRcbiAgICB9KVxuICAgIHRoaXMuaGlkZSgpXG4gICAgdGhpcy5jcmVhdGVMYXllckFUYWdzKClcbiAgfVxuXG4gIGNsZWFyTGF5ZXJBVGFnc093biAoKSB7XG4gICAgZm9yIChsZXQgYSBvZiB0aGlzLmxheWVyQVRhZ3MpICQoYSkucmVtb3ZlKClcbiAgICB0aGlzLmxheWVyQVRhZ3MgPSBbXVxuICB9XG5cbiAgLy8g5LuW44GuQWZmb2dhdG/jgqTjg7Pjgrnjgr/jg7PjgrnjgavjgojjgothVGFn44KS5raI5Y6744GZ44KLXG4gIGNsZWFyTGF5ZXJBVGFncyAoKSB7XG4gICAgY29uc3QgYWZmb2dhdG9BVGFncyA9IHRoaXMuYWZmb2dhdG9BVGFnXG4gICAgY29uc3QgYWZmb2dhdG9BVGFnc093biA9IHRoaXMubGF5ZXJBVGFnc1xuICAgIGZvciAobGV0IGEgb2YgYWZmb2dhdG9BVGFncykge1xuICAgICAgaWYgKHRoaXMubGF5ZXJBVGFncy5pbmRleE9mKGEpICE9PSAtMSkgY29udGludWVcbiAgICAgICQoYSkucmVtb3ZlKClcbiAgICB9XG4gIH1cblxuICBjcmVhdGVMYXllckFUYWdzICgpIHtcbiAgICBjb25zdCBsaW5rcyA9IHRoaXMuJGxheWVyLmZpbmQoJy5hZmZvZ2F0by1sYXllci1saW5rJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsaW5rID0gbGlua3NbaV1cbiAgICAgIGNvbnN0IHVybCA9IGxpbmsuZGF0YXNldC5ocmVmXG4gICAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gbGluay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgXG4gICAgICBjb25zdCAkYSA9ICQoYDxhIGhyZWY9JyR7dXJsfScgY2xhc3M9J2FmZm9nYXRvLWxheWVyLWEnPjwvYT5gKVxuICAgICAgY29uc3Qgc3R5bGVBdHRycyA9IE9iamVjdC5rZXlzKHRoaXMubGlua1N0eWxlcylcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBhdHRyIG9mIHN0eWxlQXR0cnMpIHtcbiAgICAgICAgc3R5bGVbYXR0cl0gPSB0aGlzLmxpbmtTdHlsZXNbYXR0cl1cbiAgICAgIH1cbiAgICAgICRhLmNzcyhzdHlsZSlcbiAgICAgICRhLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI5YaF44GuYWZmb2dhdG/jgavjgojjgovlhajjgabjga5hVGFn44KS5raI44GZXG4gICAgICAgIHRoaXMuY2xlYXJMYXllckFUYWdzKClcbiAgICAgIH0pXG4gICAgICB0aGlzLiRzdGFnZS5hcHBlbmQoJGEpXG4gICAgICB0aGlzLmxheWVyQVRhZ3MucHVzaCgkYVswXSlcbiAgICB9XG4gIH1cblxuICBjcmVhdGVMYXllciAoKSB7XG4gICAgdGhpcy4kbGF5ZXIgPSAkKGA8ZGl2IGNsYXNzPSdhZmZvZ2F0by1sYXllcic+PC9kaXY+YClcbiAgICAvLyDmlbDlgKTjga/jg5Hjg7zjgrvjg7Pjg4hcbiAgICBjb25zdCBhVGFncyA9IFtcbiAgICAgIHsgbGVmdDogMTAsIHRvcDogMTAsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgaHJlZjogJyMnIH0sXG4gICAgICB7IGxlZnQ6IDQwLCB0b3A6IDQwLCB3aWR0aDogMzAsIGhlaWdodDogMTAsIGhyZWY6ICcnIH0sXG4gICAgXVxuICAgIGZvciAobGV0IGEgb2YgYVRhZ3MpIHtcbiAgICAgIGNvbnN0ICRkaXYgPSAkKGA8ZGl2IGRhdGEtaHJlZj0nJHthLmhyZWZ9JyBjbGFzcz0nYWZmb2dhdG8tbGF5ZXItbGluayc+PC9kaXY+YClcbiAgICAgICRkaXYuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBsZWZ0OiBgJHthLmxlZnR9JWAsXG4gICAgICAgIHRvcDogYCR7YS50b3B9JWAsXG4gICAgICAgIHdpZHRoOiBgJHthLndpZHRofSVgLFxuICAgICAgICBoZWlnaHQ6IGAke2EuaGVpZ2h0fSVgXG4gICAgICB9KVxuICAgICAgdGhpcy4kbGF5ZXIuYXBwZW5kKCRkaXYpXG4gICAgfVxuICAgIHRoaXMuJHN0YWdlLmFwcGVuZCh0aGlzLiRsYXllcilcbiAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgfVxuXG4gIGhpZGUgKCkge1xuICAgIHRoaXMuJGxheWVyLmNzcyh7XG4gICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgIH0pXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLiR0YXJnZXQub24oJ21vdXNlZW50ZXInLCBldmVudCA9PiB7XG4gICAgICBpZiAoJChldmVudC5yZWxhdGVkVGFyZ2V0KS5oYXNDbGFzcygnYWZmb2dhdG8tbGF5ZXItYScpKSByZXR1cm5cbiAgICAgIGlmICghdGhpcy4kbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVMYXllcigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgICAgIH1cblxuICAgICAgdGhpcy4kdGFyZ2V0Lm9uKCdtb3VzZWxlYXZlJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoJChldmVudC5yZWxhdGVkVGFyZ2V0KS5oYXNDbGFzcygnYWZmb2dhdG8tbGF5ZXItYScpKSByZXR1cm5cbiAgICAgICAgdGhpcy5jbGVhckxheWVyQVRhZ3NPd24oKVxuICAgICAgfSlcblxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJMYXllckFUYWdzT3duKClcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuJGxheWVyLm9uKCdtb3VzZWxlYXZlJywgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH1cblxuICBzZXRUYXJnZXRTZWxlY3RvciAoc2VsZWN0b3I9JycpIHtcbiAgICB0aGlzLnRhcmdldFNlbGVjdG9yID0gc2VsZWN0b3JcbiAgfVxuXG4gIHNldExpbmtTdHlsZSAoc3R5bGVzPXt9KSB7XG4gICAgdGhpcy5saW5rU3R5bGVzID0gc3R5bGVzXG4gIH1cbn1cbiJdfQ==
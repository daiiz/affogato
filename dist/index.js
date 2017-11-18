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
    key: 'init',
    value: function init(_ref) {
      var _this2 = this;

      var links = _ref.links;

      this.$target.on('mouseenter', function (event) {
        if ((0, _jquery2.default)(event.relatedTarget).hasClass('affogato-layer-a')) return;
        if (!_this2.$layer) {
          _this2.createLayer(links);
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
  }]);

  return Affogato;
}();

exports.default = Affogato;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBZmZvZ2F0byIsInRhcmdldCIsInRhcmdldFNlbGVjdG9yIiwiJGxheWVyIiwibGF5ZXJBVGFncyIsImxpbmtTdHlsZXMiLCJzY3JvbGxUaW1lciIsInN0YWdlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xlYXJMYXllckFUYWdzIiwiYmFzZSIsIiR0YXJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJjc3MiLCJwb3NpdGlvbiIsImhpZGUiLCJjcmVhdGVMYXllckFUYWdzIiwiYSIsInJlbW92ZSIsImFmZm9nYXRvQVRhZ3MiLCJhZmZvZ2F0b0FUYWciLCJhZmZvZ2F0b0FUYWdzT3duIiwiaW5kZXhPZiIsImxpbmtzIiwiZmluZCIsImkiLCJsZW5ndGgiLCJsaW5rIiwidXJsIiwiZGF0YXNldCIsImhyZWYiLCIkYSIsInN0eWxlQXR0cnMiLCJPYmplY3QiLCJrZXlzIiwic3R5bGUiLCJhdHRyIiwib24iLCIkc3RhZ2UiLCJhcHBlbmQiLCJwdXNoIiwiYVRhZ3MiLCIkZGl2IiwiZGlzcGxheSIsInVwZGF0ZUxheWVyIiwidmlzaWJpbGl0eSIsImV2ZW50IiwicmVsYXRlZFRhcmdldCIsImhhc0NsYXNzIiwiY3JlYXRlTGF5ZXIiLCJjbGVhckxheWVyQVRhZ3NPd24iLCJ3aW5kb3ciLCJfaGlkZUxheWVyQVRhZ093biIsIm9uU2Nyb2xsU3RvcCIsImlzTGlua3NWaXNpYmxlIiwicmVyZW5kZXIiLCJjYWxsYmFjayIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzZWxlY3RvciIsInN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBLFE7QUFDbkIsc0JBQWU7QUFBQTs7QUFDYixTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNB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Q0FBa0IsWUFBTTtBQUN0QixnQkFBSSxPQUFLQyxjQUFULEVBQXlCLE9BQUtDLFFBQUw7QUFDMUIsV0FGRDtBQUdELFNBTEQ7QUFPRCxPQXhCRDtBQXlCRDs7O2lDQUVhQyxRLEVBQVU7QUFDdEIsVUFBSSxLQUFLM0QsV0FBVCxFQUFzQnNELE9BQU9NLFlBQVAsQ0FBb0IsS0FBSzVELFdBQXpCO0FBQ3RCLFdBQUtBLFdBQUwsR0FBbUJzRCxPQUFPTyxVQUFQLENBQWtCLFlBQU07QUFDekMsWUFBSUYsUUFBSixFQUFjQTtBQUNmLE9BRmtCLEVBRWhCLEdBRmdCLENBQW5CO0FBR0Q7Ozt3Q0FFK0I7QUFBQSxVQUFiRyxRQUFhLHVFQUFKLEVBQUk7O0FBQzlCLFdBQUtsRSxjQUFMLEdBQXNCa0UsUUFBdEI7QUFDRDs7O21DQUV3QjtBQUFBLFVBQVhDLE1BQVcsdUVBQUosRUFBSTs7QUFDdkIsV0FBS2hFLFVBQUwsR0FBa0JnRSxNQUFsQjtBQUNEOzs7K0JBRVc7QUFDVixXQUFLVixrQkFBTDtBQUNBLFdBQUtOLFdBQUw7QUFDRDs7O3dCQWxKYztBQUNiLGFBQU8sc0JBQUUsS0FBS3BELE1BQUwsSUFBZSxLQUFLQyxjQUF0QixDQUFQO0FBQ0Q7Ozt3QkFFYTtBQUNaLGFBQU8sc0JBQUUsV0FBRixDQUFQO0FBQ0Q7Ozt3QkFFbUI7QUFDbEIsYUFBTyxzQkFBRSxtQkFBRixDQUFQO0FBQ0Q7Ozt3QkFzRnFCO0FBQ3BCLGFBQU8sS0FBS0UsVUFBTCxDQUFnQitCLE1BQWhCLEdBQXlCLENBQWhDO0FBQ0Q7OzsrQkF0R2tCO0FBQ2pCLDRCQUFFLGlCQUFGLEVBQXFCUixNQUFyQjtBQUNEOzs7Ozs7a0JBbkJrQjNCLFEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFmZm9nYXRvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudGFyZ2V0ID0gbnVsbFxuICAgIHRoaXMudGFyZ2V0U2VsZWN0b3IgPSAnJ1xuICAgIHRoaXMuJGxheWVyID0gbnVsbFxuICAgIHRoaXMubGF5ZXJBVGFncyA9IFtdXG4gICAgdGhpcy5saW5rU3R5bGVzID0ge31cbiAgICB0aGlzLnNjcm9sbFRpbWVyID0gbnVsbFxuXG4gICAgbGV0IHN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FmZm9nYXRvJylcbiAgICBpZiAoIXN0YWdlKSB7XG4gICAgICBzdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBzdGFnZS5pZCA9ICdhZmZvZ2F0bydcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhZ2UpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsZWFyQWxsICgpIHtcbiAgICAkKCcuYWZmb2dhdG8tbGF5ZXInKS5yZW1vdmUoKVxuICB9XG5cbiAgZ2V0ICR0YXJnZXQgKCkge1xuICAgIHJldHVybiAkKHRoaXMudGFyZ2V0IHx8IHRoaXMudGFyZ2V0U2VsZWN0b3IpXG4gIH1cblxuICBnZXQgJHN0YWdlICgpIHtcbiAgICByZXR1cm4gJCgnI2FmZm9nYXRvJylcbiAgfVxuXG4gIGdldCBhZmZvZ2F0b0FUYWcgKCkge1xuICAgIHJldHVybiAkKCcuYWZmb2dhdG8tbGF5ZXItYScpXG4gIH1cblxuICB1cGRhdGVMYXllciAoKSB7XG4gICAgdGhpcy5jbGVhckxheWVyQVRhZ3MoKVxuICAgIGNvbnN0IGJhc2UgPSB0aGlzLiR0YXJnZXRbMF1cbiAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gYmFzZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuJGxheWVyLmNzcyh7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodFxuICAgIH0pXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLmNyZWF0ZUxheWVyQVRhZ3MoKVxuICB9XG5cbiAgY2xlYXJMYXllckFUYWdzT3duICgpIHtcbiAgICBmb3IgKGxldCBhIG9mIHRoaXMubGF5ZXJBVGFncykgJChhKS5yZW1vdmUoKVxuICAgIHRoaXMubGF5ZXJBVGFncyA9IFtdXG4gIH1cblxuICAvLyBYWFg6IOS9v+eUqOazqOaEj1xuICBfaGlkZUxheWVyQVRhZ093biAoKSB7XG4gICAgZm9yIChsZXQgYSBvZiB0aGlzLmxheWVyQVRhZ3MpICQoYSkuaGlkZSgpXG4gIH1cblxuICAvLyDku5bjga5BZmZvZ2F0b+OCpOODs+OCueOCv+ODs+OCueOBq+OCiOOCi2FUYWfjgpLmtojljrvjgZnjgotcbiAgY2xlYXJMYXllckFUYWdzICgpIHtcbiAgICBjb25zdCBhZmZvZ2F0b0FUYWdzID0gdGhpcy5hZmZvZ2F0b0FUYWdcbiAgICBjb25zdCBhZmZvZ2F0b0FUYWdzT3duID0gdGhpcy5sYXllckFUYWdzXG4gICAgZm9yIChsZXQgYSBvZiBhZmZvZ2F0b0FUYWdzKSB7XG4gICAgICBpZiAodGhpcy5sYXllckFUYWdzLmluZGV4T2YoYSkgIT09IC0xKSBjb250aW51ZVxuICAgICAgJChhKS5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUxheWVyQVRhZ3MgKCkge1xuICAgIGNvbnN0IGxpbmtzID0gdGhpcy4kbGF5ZXIuZmluZCgnLmFmZm9nYXRvLWxheWVyLWxpbmsnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpbmsgPSBsaW5rc1tpXVxuICAgICAgY29uc3QgdXJsID0gbGluay5kYXRhc2V0LmhyZWZcbiAgICAgIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBsaW5rLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBcbiAgICAgIGNvbnN0ICRhID0gJChgPGEgaHJlZj0nJHt1cmx9JyBjbGFzcz0nYWZmb2dhdG8tbGF5ZXItYSc+PC9hPmApXG4gICAgICBjb25zdCBzdHlsZUF0dHJzID0gT2JqZWN0LmtleXModGhpcy5saW5rU3R5bGVzKVxuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHRcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGF0dHIgb2Ygc3R5bGVBdHRycykge1xuICAgICAgICBzdHlsZVthdHRyXSA9IHRoaXMubGlua1N0eWxlc1thdHRyXVxuICAgICAgfVxuICAgICAgJGEuY3NzKHN0eWxlKVxuICAgICAgJGEub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyDjg4njgq3jg6Xjg6Hjg7Pjg4jlhoXjga5hZmZvZ2F0b+OBq+OCiOOCi+WFqOOBpuOBrmFUYWfjgpLmtojjgZlcbiAgICAgICAgdGhpcy5jbGVhckxheWVyQVRhZ3MoKVxuICAgICAgfSlcbiAgICAgIHRoaXMuJHN0YWdlLmFwcGVuZCgkYSlcbiAgICAgIHRoaXMubGF5ZXJBVGFncy5wdXNoKCRhWzBdKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUxheWVyIChsaW5rcz1bXSkge1xuICAgIHRoaXMuJGxheWVyID0gJChgPGRpdiBjbGFzcz0nYWZmb2dhdG8tbGF5ZXInPjwvZGl2PmApXG4gICAgLy8g5pWw5YCk44Gv44OR44O844K744Oz44OIXG4gICAgY29uc3QgYVRhZ3MgPSBsaW5rc1xuICAgIGZvciAobGV0IGEgb2YgYVRhZ3MpIHtcbiAgICAgIGNvbnN0ICRkaXYgPSAkKGA8ZGl2IGRhdGEtaHJlZj0nJHthLmhyZWZ9JyBjbGFzcz0nYWZmb2dhdG8tbGF5ZXItbGluayc+PC9kaXY+YClcbiAgICAgICRkaXYuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBsZWZ0OiBgJHthLmxlZnR9JWAsXG4gICAgICAgIHRvcDogYCR7YS50b3B9JWAsXG4gICAgICAgIHdpZHRoOiBgJHthLndpZHRofSVgLFxuICAgICAgICBoZWlnaHQ6IGAke2EuaGVpZ2h0fSVgXG4gICAgICB9KVxuICAgICAgdGhpcy4kbGF5ZXIuYXBwZW5kKCRkaXYpXG4gICAgfVxuICAgIHRoaXMuJHN0YWdlLmFwcGVuZCh0aGlzLiRsYXllcilcbiAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgfVxuXG4gIGhpZGUgKCkge1xuICAgIHRoaXMuJGxheWVyLmNzcyh7XG4gICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgIH0pXG4gIH1cblxuICBnZXQgaXNMaW5rc1Zpc2libGUgKCkge1xuICAgIHJldHVybiB0aGlzLmxheWVyQVRhZ3MubGVuZ3RoID4gMFxuICB9XG5cbiAgaW5pdCAoeyBsaW5rcyB9KSB7XG4gICAgdGhpcy4kdGFyZ2V0Lm9uKCdtb3VzZWVudGVyJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKCQoZXZlbnQucmVsYXRlZFRhcmdldCkuaGFzQ2xhc3MoJ2FmZm9nYXRvLWxheWVyLWEnKSkgcmV0dXJuXG4gICAgICBpZiAoIXRoaXMuJGxheWVyKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTGF5ZXIobGlua3MpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyKClcbiAgICAgIH1cblxuICAgICAgdGhpcy4kdGFyZ2V0Lm9uKCdtb3VzZWxlYXZlJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoJChldmVudC5yZWxhdGVkVGFyZ2V0KS5oYXNDbGFzcygnYWZmb2dhdG8tbGF5ZXItYScpKSByZXR1cm5cbiAgICAgICAgdGhpcy5jbGVhckxheWVyQVRhZ3NPd24oKVxuICAgICAgfSlcblxuICAgICAgdGhpcy4kbGF5ZXIub24oJ21vdXNlbGVhdmUnLCBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9KVxuXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGlkZUxheWVyQVRhZ093bigpXG4gICAgICAgIHRoaXMub25TY3JvbGxTdG9wKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc0xpbmtzVmlzaWJsZSkgdGhpcy5yZXJlbmRlcigpXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgfSlcbiAgfVxuXG4gIG9uU2Nyb2xsU3RvcCAoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5zY3JvbGxUaW1lcikgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVyKVxuICAgIHRoaXMuc2Nyb2xsVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKClcbiAgICB9LCAyMDApXG4gIH1cblxuICBzZXRUYXJnZXRTZWxlY3RvciAoc2VsZWN0b3I9JycpIHtcbiAgICB0aGlzLnRhcmdldFNlbGVjdG9yID0gc2VsZWN0b3JcbiAgfVxuXG4gIHNldExpbmtTdHlsZSAoc3R5bGVzPXt9KSB7XG4gICAgdGhpcy5saW5rU3R5bGVzID0gc3R5bGVzXG4gIH1cblxuICByZXJlbmRlciAoKSB7XG4gICAgdGhpcy5jbGVhckxheWVyQVRhZ3NPd24oKVxuICAgIHRoaXMudXBkYXRlTGF5ZXIoKVxuICB9XG59XG4iXX0=
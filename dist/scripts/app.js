(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	var _moduleImport = require('./module/import');

	var pinUnpin = new _moduleImport.PinUnpin('side-nav', 'side-nav-wrapper', 90, true);

	console.log(_moduleImport.myName);

	pinUnpin.logger();
	console.log(pinUnpin instanceof _moduleImport.ConntentScroll); //true
	console.log(pinUnpin instanceof _moduleImport.PinUnpin); //true

	var cachedScrollYpos = window.pageYOffset;
	var isScrolled = false;

	var onScroll = function onScroll() {
		var scrollYpos = window.pageYOffset;
		var scrollDirection = scrollYpos > cachedScrollYpos ? 'down' : 'up';

		pinUnpin.eventStart(scrollDirection);

		cachedScrollYpos = scrollYpos;
	};

	window.addEventListener("scroll", function () {

		isScrolled = true;
	});

	setInterval(function () {

		if (isScrolled) {
			isScrolled = false;

			onScroll();
		}
	}, 50);
})();

},{"./module/import":2}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ConntentScroll = (function () {
	function ConntentScroll(targetElm, watchElm, offset) {
		_classCallCheck(this, ConntentScroll);

		this.targetElm = document.getElementById(targetElm);
		this.watchElm = document.getElementById(watchElm);
		this.offset = offset;
	}

	ConntentScroll.prototype.logger = function logger() {
		console.log('Target Element: ' + this.targetElm + '. The wathch Element: ' + this.watchElm);
	};

	ConntentScroll.prototype.getViewPort = function getViewPort() {

		var winW = window.innerWidth;

		var chkViewPort = winW < 768 ? 'mobile' : winW > 991 ? 'desktop' : 'tablet ';

		return chkViewPort;
	};

	ConntentScroll.prototype.getOnScrollEvent = function getOnScrollEvent() {
		var scrollEvent = /Android|Nexus|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? "touchmove" : "scroll";

		return scrollEvent;
	};

	return ConntentScroll;
})();

var PinUnpin = (function (_ConntentScroll) {
	_inherits(PinUnpin, _ConntentScroll);

	function PinUnpin(targetElm, watchElm, offset, isPin) {
		_classCallCheck(this, PinUnpin);

		_ConntentScroll.call(this, targetElm, watchElm, offset);
		this.isPinned = true;
	}

	PinUnpin.prototype.logger = function logger() {
		console.log('isPinned = ' + this.isPinned);
	};

	PinUnpin.prototype.eventStart = function eventStart(scrollDirection) {

		var isPin = this.isPinned,
		    targetElm = this.targetElm,
		    offset = this.offset,
		    targetElmHeight = this.targetElm.offsetHeight,
		    bottom = this.watchElm.getBoundingClientRect().bottom;

		if (bottom - offset <= targetElmHeight && isPin && scrollDirection === 'down') {

			targetElm.classList.remove('yesme-pinOnTop');
			targetElm.classList.add('yesme-pinOnBottom');

			this.isPinned = false;
		} else if (bottom - offset > targetElmHeight && !isPin && scrollDirection === 'up') {

			targetElm.classList.add('yesme-pinOnTop');
			targetElm.classList.remove('yesme-pinOnBottom');
			this.isPinned = true;
		}
	};

	_createClass(PinUnpin, [{
		key: 'pinned',
		set: function set(value) {
			this.isPinned = value;
		},
		get: function get() {
			return this.isPinned;
		}
	}, {
		key: 'posY',
		set: function set(pos) {
			this.scrollYpos = pos;
		},
		get: function get() {
			return this.scrollYpos;
		}
	}]);

	return PinUnpin;
})(ConntentScroll);

var myName = "amy Huang";

exports.PinUnpin = PinUnpin;
exports.ConntentScroll = ConntentScroll;
exports.myName = myName;

},{}]},{},[1]);

(function(window) {
	'use strict';
	var calc = {
		result: null,
		elements: {
			display: document.getElementById('display')
		}
	};

	calc._setDisplay = function(content) {
		this.elements.display.value = content;
	};

	calc.clear = function() {
		this._setDisplay('');
	};

	calc.del = function() {
		var displayValue = this.elements.display.value.slice(0, -1);

		if (displayValue.endsWith('.') || displayValue.endsWith(',')) {
			displayValue = displayValue.slice(0, -1); //Remove , or .
		}

		this._setDisplay(displayValue);
	};

	calc.equals = function() {
		this.result = this.elements.display.value;
		var evalCode = '' + this.result / 100 + ';';

		this._setDisplay(eval(evalCode));
	};

	window.calc = calc;
})(window);

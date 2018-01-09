(function(window){
	var calc = {
	result: null,
	elements: {
		'display': document.getElementById('display')
	},

	_setDisplay: function(content) {
		display.value = content;
	},

	clear: function() {
		this._setDisplay('');
	},

	del: function() {
		var displayValue =  this.elements.display.value.slice(0,-1);

		if(displayValue[displayValue.length-1] === '.' 
		   || displayValue[displayValue.length-1] === ',' )	{
			displayValue = displayValue.slice(0,-1)//Remove , or .
		}
		this._setDisplay(displayValue);
	},
	equals: function() {
		this.result = this.elements.display.value;
		var evalCode = ''+ (this.result / 100) +';';
		
		this._setDisplay(eval(evalCode));
	}
};

window.calc = calc;

})(window);
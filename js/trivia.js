(function(window) {
	'use strict';

	function _generateNumber() {
		return Math.floor(Math.random() * 200);
	}

	function _render(number, answer) {
		document.getElementById('triviaNumber').innerHTML = number;
		document.getElementById('triviaAnswer').innerHTML = answer;
	}

	function _requestTrivia(number) {
		let xhr = new XMLHttpRequest();

		xhr.onload = () => _render(number, xhr.response);

		xhr.open('GET', 'http://numbersapi.com/' + number);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
	}

	function newTrivia() {
		_requestTrivia(_generateNumber());
	}

	newTrivia();

	window.newTrivia = newTrivia;
})(window);

(function(window) {
	'use strict';

	const getCookie = cookieKey => {
		return document.cookie.split(';').reduce(function(obj, cookie) {
			let keyValue = cookie.split('=');
			obj[keyValue[0].trim()] = keyValue[1];

			return obj;
		}, {})[cookieKey];
	};

	const setCookie = () => {
		let now = new Date();
		const expireDate = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 365 * 20);
		document.cookie = `last_visit=${now.getTime()};expires=${expireDate.toUTCString()}`;
	};

	const calculateLastVisit = () => {
		let seconds = (Date.now() - getCookie('last_visit')) / 1000;

		const days = Math.floor(seconds / (3600 * 24));

		seconds -= days * 3600 * 24;

		const hours = Math.floor(seconds / 3600);

		seconds -= hours * 3600;

		const minutes = Math.floor(seconds / 60);

		seconds -= minutes * 60;

		const tmp = [];

		days && tmp.push(days + 'd');

		(days || hours) && tmp.push(hours + 'h');

		(days || hours || minutes) && tmp.push(minutes + 'm');

		tmp.push(Math.floor(seconds) + 's');

		return tmp.join(' ');
	};

	const renderLastVisit = () => {
		const time = calculateLastVisit();

		document.querySelector('.about__last-visit').innerHTML = `Your last visit was ${time} ago.`;
	};

	if (getCookie('last_visit') > 0) {
		renderLastVisit();
		setInterval(renderLastVisit, 1000);
	}

	window.addEventListener('unload', () => {
		setCookie();
	});
})(window);

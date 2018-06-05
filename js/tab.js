(function(window) {
	let tabs = Array.from(document.querySelectorAll('.tab__title'));

	function toggleTab(tabId) {
		let previousTabs = Array.from(document.querySelectorAll('.tab__title--selected'));
		let activeTabs = Array.from(document.querySelectorAll("[data-tab-id='" + tabId + "']"));
		let previousContent = document.querySelector('.tab__content--selected');
		let activeContent = document.querySelector("[data-content-id='" + tabId + "']");

		//Deactivate previous selected tabs
		previousTabs.forEach(tab => tab.classList.remove('tab__title--selected'));

		//Activate the current content
		activeTabs.forEach(tab => tab.classList.add('tab__title--selected'));

		//Toggle between previous content and
		previousContent.classList.remove('tab__content--selected');
		activeContent.classList.add('tab__content--selected');
	}

	tabs.forEach(tab => {
		tab.addEventListener('click', function() {
			toggleTab(this.dataset.tabId);
		});
	});

	let tabsContainer = Array.from(document.querySelectorAll('.tab__container > .tab__title'));

	tabsContainer.forEach(tabContainer => {
		//On mobile devices, position the window in front of the active tab.
		tabContainer.addEventListener('click', function() {
			window.scrollToElement(this, 1000);
		});
	});
})(window);

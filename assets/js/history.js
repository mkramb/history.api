// only executes if history api is enabled
if (window.history && window.history.pushState) {
	addEvent('load', function() {
		// process clicked link
		function processUrl(data, push) {
			loadURL(data.url, function(request) {
				document.getElementsByTagName('html')[0].innerHTML = request.responseText;
				if (push) history.pushState(data, data.title, data.url);
			});
		}

		// listen for click event
		addEvent('click', function(event) {
			var element = event.target || event.srcElement;

			if (isLink(element)) {
				var href = element.getAttribute('href'),
					protocol = element.protocol;

				// ensure the protocol is not part of URL, meaning it's relative
				if (
					href && href.slice(0, protocol.length) !== protocol 
					&& href.indexOf("javascript:") !== 0
				) {
					processUrl({
						url: href,
						title: element.innerHTML
					}, true);

					event.preventDefault();
					return false;
				}
			}
		});

		// load content on state change
		addEvent('popstate', function(event) {
			var data = event.state;
			if (data) processUrl(data);
		});
	}
}
// crossbrowser event adding
function addEvent(event, func) {
    if (window.addEventListener) window.addEventListener(event, func, false);
    else if (window.attachEvent) window.attachEvent('on' + event, func);
};

// detect if element is a link
function isLink(element) {
	if (element.tagName === 'A') return true;
	return (element.parentNode) ? isLink(element.parentNode) : false;
};

// load remote content
function loadURL(url, callback) {
    var request = createXMLHTTPObject();
    if (!request) return;

    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState != 4) return;
        if (request.status != 200 && request.status != 304) {
			console.log('HTTP error ' + request.status);
            return;
        }
        callback(request);
    }

    if (request.readyState == 4) return;
    request.send();
}

// returns xmlhttp object
function createXMLHTTPObject() {
    var xmlhttp = false,
	    XMLHttpFactories = [
	    	function () { return new XMLHttpRequest() },
	    	function () { return new ActiveXObject("Msxml2.XMLHTTP") },
		    function () { return new ActiveXObject("Msxml3.XMLHTTP") },
		    function () { return new ActiveXObject("Microsoft.XMLHTTP") }
		];

    for (var i=0; i<XMLHttpFactories.length; i++) {
        try { xmlhttp = XMLHttpFactories[i](); }
        catch (e) { continue; }
        break;
    }

    return xmlhttp;
}
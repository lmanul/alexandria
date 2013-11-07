function getClickHandler() {
  return function(info, tab) {

    // construct a url pass data to the view
    var url = 'extractBook.html#' + info.linkUrl;

    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 900, height: 760 });
  };
};

chrome.app.runtime.onLaunched.addListener(
  function(request, sender, sendResponse) {
    //var optionString = localStorage["READIUM_OPTIONS"];
    //var options = (optionString && JSON.parse(optionString) ) || {"singleton": {}};
    //sendResponse(options["singleton"]);

    chrome.app.window.create('views/library.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });

  });

// create a context menu item
//chrome.contextMenus.create({
//  "title" : chrome.i18n.getMessage("i18n_add_book"),
//  "type" : "normal",
//  "contexts" : ["link"],
//  "onclick" : getClickHandler(),
//  "targetUrlPatterns" : ["file:///*.epub","*://*/*.epub"] // specify the item to epub files only
//});



function setStartGame(startUrl, endUrl) {
  var course = {
    startUrl: startUrl,
    endUrl: endUrl
  };

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: course}, function(response) {
      console.log(response.errorMsg);
    });
  });
}

chrome.runtime.onMessageExternal.addListener (
  function(request, sender, sendResponse) {
    	// if(request.action == "startGame") {
    	// 	setStartGame();
    	// 	console.log("that actually worked!");
      //       sendResponse({farewell: "loopback"});
    	// }

      if(request.saveContent){
        setStartGame(request.saveContent.startUrl, request.saveContent.endUrl);

        chrome.storage.sync.set({'data': request.saveContent}, function() {
        // Notify that we saved.
          console.log('Settings saved');
        });
      }
  });


console.log("LOADED!");

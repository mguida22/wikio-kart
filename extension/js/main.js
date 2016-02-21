
function setStartGame() {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "startGame"}, function(response) {
    console.log(response.errorMsg);
  });
});
}

chrome.runtime.onMessageExternal.addListener (
  function(request, sender, sendResponse) {
    	if(request.action == "startGame") {
    		setStartGame();
    		console.log("that actually worked!");
            sendResponse({farewell: "goodbye"});
    	}
  });


console.log("LOADED!");

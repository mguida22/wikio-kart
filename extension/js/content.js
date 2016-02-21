var startPage = "New_Zealand";
var stopPage = "Donald_Trump";
var URLCollection = [];


 var data = {
   start: 0,
   end: 0,
   userId: "1234",
   history: []
}

function startGame () {


	data.start = Date.now()												// get system time
	URLCollection.length = 0;												// clear array
    console.log("Starting game");
						// Redirect to wikipage
}


function stopGame () {

	data.end = Date.now()	// get system time
	console.log("Found it. bro.");
	console.log(data.end);
	alert("You found Donald Trump at this time:\n" + data.end);

	data.history = URLCollection;

	$.ajax({
	    type: "POST",
		url: 'localhost:3000/api/game',
	    data: data,
	    success: function() {
	      console.log('post success');
	    },
	    error: function() {
	      console.log("post error")
		}
  	});


}

function catchURL () {
	currentURL = window.location.href;
	URLCollection.push(currentURL);
}


$(function() {						// Every page load

	catchURL();
	if (window.location.href == "https://en.wikipedia.org/wiki/"+stopPage) {
		stopGame();
	}

});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Recieved Request from background")
    if (request.action == "startGame")
    	startGame();
    	sendResponse({errorMsg: "goodbye"});
  });
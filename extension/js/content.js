var startPage = "New_Zealand";
var stopPage = "Puppy";
var URLCollection = [];


 var data = {
   startTime: 0,
   endTime: 0,
   userId: "1234",
   history: []
}

function startGame () {


	data.startTime = Date.now()												// get system time
	URLCollection.length = 0;												// clear array
    console.log("Starting game");
						
}


function stopGame () {

	data.endTime = Date.now()	// get system time
	console.log("Found it. bro.");
	console.log(data.endTime);
	alert("You found puppies at this time:\n" + data.endTime);

	data.history = URLCollection;

	$.ajax({
	    type: "POST",
		url: '/api/game',
	    data: data,
	    success: function() {
	      console.log('post success');
	    },
	    error: function() {
	      console.log("post error")
		}
  	});

	console.log(window.location.href);
	window.location.href = "https://wikiokart.com";
	console.log(window.location.href);

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

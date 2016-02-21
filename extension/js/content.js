var startPage = null;
var stopPage = null;
var URLCollection = [];

var data = {
  startTime: 0,
  endTime: 0,
  userId: null,
  history: []
}

function startGame(course) {
  startPage = course.startPage;
  stopPage = course.stopPage;
	data.startTime = Date.now();												// get system time
	URLCollection.length = 0;												// clear array
  console.log("Starting game");
}

function stopGame() {
	data.endTime = Date.now()	// get system time
	console.log("Found it. bro.");
	console.log(data.endTime);
	alert("You finished at this time:\n" + data.endTime);

	data.history = URLCollection;

	$.ajax({
	  type: "POST",
		url: '/api/game',
    data: data,
    success: function() {
      console.log('post success');
      window.location.href = "https://wikiokart.com/highscores";
    },
    error: function() {
      console.log("post error");
      window.location.href = "https://wikiokart.com/";
		}
  });
}

function catchURL() {
	currentURL = window.location.href;
	URLCollection.push(currentURL);
}


$(function() {						// Every page load
	catchURL();
	if (window.location.href == stopPage) {
		stopGame();
	}
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Recieved Request from background")
    if (request.action) {
      startGame(request.action.course);
    }
    sendResponse({errorMsg: "goodbye"});
  });

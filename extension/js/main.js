var startURL;
var stopURL = "https://en.wikipedia.org/wiki/Donald_Trump";
var URLCollection = [];
var startTime = new Date();
var stopTime = new Date();	

 var data = {
   "start": startTime,
   "end": stopTime,
   "userId": "1234",
   "history": URLCollection
}

function startGame () {

	startTime = new Date();		// get system time
	URLCollection.length = 0		// clear array
}

function stopGame () {

	stopTime = new Date();	// get system time
	console.log("Found it. bro.");
	console.log(data.end);

	$.ajax({
    type: "POST",
    url: '/api',
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
	console.log(currentURL);
	
}


$(function() {

	catchURL();
	if (window.location.href == stopURL){
		stopGame();
	}

});




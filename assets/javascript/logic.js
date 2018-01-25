
  var config = {
    apiKey: "AIzaSyBKKii4pzj3RzZ614BM3Ei1LRcoVTXFGDQ",
    authDomain: "trainschedule-87f2d.firebaseapp.com",
    databaseURL: "https://trainschedule-87f2d.firebaseio.com",
    projectId: "trainschedule-87f2d",
    storageBucket: "trainschedule-87f2d.appspot.com",
    messagingSenderId: "60004819055"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
  event.preventDefault();

  var trainName = $("#train").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = moment($("#time").val().trim(), "HH.mm").format("X");
  var frequency = $("#freq").val().trim();

  console.log(trainTime + " train time");
  console.log(moment(trainTime, "X").format("HH:mm") + " Traintimeformated");

  var newTrainSchedule = {
    train: trainName,
    destination: destination,
    time: trainTime,
    freq: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  database.ref().push(newTrainSchedule);

  $("#train").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#freq").val("");

});

database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().freq;

  var trainTimeFormat = moment(trainTime, "X").format("HH:mm");

  // var trainTimeConvert = moment(trainTimeFormat, "HH:mm").subtract(1, "years");
  var trainTimeConvert = moment(trainTimeFormat, "HH:mm");
  console.log("Train Time " + trainTimeConvert);
  console.log("Train Time Convert" + moment(trainTimeConvert, "X").format("HH:mm"));

  var currentTimeFormatted = moment();
  console.log("currenttime " + moment().format("HH:mm"));

  var timeDifference = moment().diff(moment(trainTimeConvert, "HH:mm"), "minutes");
  console.log("timeDifferent " + timeDifference);

  // var timeRemaining = Math.abs(timeDifference) % frequency;
  // console.log("Time Remaining " + timeRemaining);
  // var minutesUntilTrain = frequency - timeRemaining; 

  if (timeDifference < 0) {
    timeDifference = Math.abs(timeDifference);
    var timeRemaining = timeDifference % frequency;
    console.log("Time Remaining " + timeRemaining);
    var minutesUntilTrain = frequency - timeRemaining; 
  	console.log("minutes until train " + minutesUntilTrain);
  	var Arrival = moment().add(timeRemaining, "minutes");
  	// var Arrival = moment().substract(trainTime);
  	console.log("arrival " + Arrival);
  	var arrivalFormatted = moment(Arrival, "X").format("HH:mm");
  	$(".trainschedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
  + "</td><td>" + arrivalFormatted + "</td><td>" + timeRemaining + "</td></tr>");
  	console.log("ARRIVAL " + arrivalFormatted);
  }

  else {
    var timeRemaining = Math.abs(timeDifference) % frequency;
    console.log("Time Remaining " + timeRemaining);
    var minutesUntilTrain = frequency - timeRemaining; 
    var nextArrival = moment().add(minutesUntilTrain, "minutes");
    console.log("Next Arrival " + nextArrival);
    var arrivalTime = moment(nextArrival).format("HH:mm");  
    console.log("Arrival Time " + arrivalTime);
    $(".trainschedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
  + "</td><td>" + arrivalTime + "</td><td>" + minutesUntilTrain + "</td></tr>");
  }
 
});



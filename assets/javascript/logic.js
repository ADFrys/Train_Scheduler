
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

  var trainTimeConverted = moment(trainTime, "HH:mm");

  var currentTime = moment();

  var timeDifference = moment().diff(moment.unix(trainTimeConverted, "X"), "minutes");

  var timeRemaining = timeDifference % frequency;

  var minutesUntilTrain = frequency - timeRemaining; 

  var nextArrival = moment().add(minutesUntilTrain, "minutes");
  var arrivalTime = moment(nextArrival).format("HH:mm");  

  
  // var trainTimeFormatted = moment.unix(trainTime).format("HH:mm");

  $(".trainschedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
  + "</td><td>" + arrivalTime + "</td><td>" + minutesUntilTrain + "</td></tr>");
});



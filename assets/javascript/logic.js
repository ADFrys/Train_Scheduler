
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
    freq: frequency
  };

  database.ref().push(newTrainSchedule);
  console.log(newTrainSchedule.train);
  console.log(newTrainSchedule.destination);
  console.log(newTrainSchedule.time);
  console.log(newTrainSchedule.freq);

  $("#train").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#freq").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().trainTime;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);
  
  var trainTimeFormatted = moment.unix(trainTime).format("HH:mm");

  $(".trainschedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainTimeFormatted + "</td><td>" + frequency + "</td></tr>");
});



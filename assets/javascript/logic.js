src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWGJZO7UVDLAOeAM36cW7kYnlRs9BrQTI",
    authDomain: "fir-trains-11325.firebaseapp.com",
    databaseURL: "https://fir-trains-11325.firebaseio.com",
    projectId: "fir-trains-11325",
    storageBucket: "fir-trains-11325.appspot.com",
    messagingSenderId: "767408081415"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$('#addTrainBtn').on("click", function(){

	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destInput').val().trim();
	var firstTrain = $('#firstTrainInput').val().trim();
	var frequency = $('#freqInput').val().trim();

	var newTrain = {
		name: trainName,
		dest: destination,
		first: firstTrain,
		freq: frequency
	}

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.first);
	console.log(newTrain.freq);

	$('#trainNameInput').val("");
	$('#destInput').val("");
	$('#firstTrainInput').val("");
	$('#freqInput').val("");

	return false;
});

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	// Store everything into a variable
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTrain = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
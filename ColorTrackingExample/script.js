// Wait for the page to be ready
//var synth = new Tone.Synth().toMaster()

var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.5);
var synth =new Tone.DuoSynth().chain(delay, reverb);
 /*var synth = new Tone.Synth({
  oscillator: {
    type: 'fmsquare',
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster()*/

/*
$("#chord").mousedown(function() { // when "button_id" is clicked
	var distortion = new Tone.Distortion(0.6)
var tremolo = new Tone.Tremolo().start()

var polySynth = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master)
	polySynth.triggerAttack(['C4', 'E4', 'G4', 'B4']) 
	
});
* */

window.addEventListener("load", function(e) {
  console.log("Page loaded!");
  // Store the color we will be tracking (selectable by clicking on the webcam feed)
  var color = {r: 255, g: 0, b: 0};

  // Grab reference to the tags we will be using
  var slider = document.getElementById("tolerance");
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');
  var swatch = document.getElementById("color");
  
  var distortion = new Tone.Distortion(0.6)
var tremolo = new Tone.Tremolo().start()

var polySynth = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master)

document.querySelector('#chord').addEventListener('click tap', () => { 
	alert("Hello");

	polySynth.triggerAttack(['C3', 'E3', 'G3', 'B3']) 
})

document.querySelector('#chord').addEventListener('mousedown', () => { 

	polySynth.triggerAttack(['C3', 'E3', 'G3', 'B3']) 
})

document.querySelector('#chord').addEventListener('mouseup', () => { 
	polySynth.triggerRelease(['C3', 'E3', 'G3', 'B3']) 
})

  // Register our custom color tracking function
  tracking.ColorTracker.registerColor('dynamic', function(r, g, b) {
    return getColorDistance(color, {r: r, g: g, b: b}) < slider.value
  });

  // Create the color tracking object
  var tracker = new tracking.ColorTracker("dynamic");

  // Add callback for the "track" event
  tracker.on('track', function(e) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (e.data.length !== 0) {

      e.data.forEach(function(rect) {
        // console.log(rect);
        drawRect(rect, context, color);
      });

    }

  });
  

  // Start tracking
  tracking.track(webcam, tracker, { camera: true } );

  // Add listener for the click event on the video
  webcam.addEventListener("click", function (e) {

    // Grab color from the video feed where the click occured
    var c = getColorAt(webcam, e.offsetX, e.offsetY);

    // Update target color
    color.r = c.r;
    color.g = c.g;
    color.b = c.b;

    // Update the div's background so we can see which color was selected
    swatch.style.backgroundColor = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";

  });

});


function play(){
       var webcam = document.getElementById('webcam');
       if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    webcam.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log("Something went wrong!");
  });
}
       webcam.play();
                 }


// Calculates the Euclidian distance between the target color and the actual color
function getColorDistance(target, actual) {
  return Math.sqrt(
    (target.r - actual.r) * (target.r - actual.r) +
    (target.g - actual.g) * (target.g - actual.g) +
    (target.b - actual.b) * (target.b - actual.b)
  );
}

// Returns the color at the specified x/y location in the webcam video feed
function getColorAt(webcam, x, y) {

  // To be able to access pixel data from the webcam feed, we must first draw the current frame in
  // a temporary canvas.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = webcam.width;
  canvas.height = webcam.height;
  context.drawImage(webcam, 0, 0, webcam.width, webcam.height);

  // Then we grab the pixel information from the temp canvas and return it as an object
  var pixel = context.getImageData(x, y, 1, 1).data;
  console.log("X,Y"); 
  console.log(x); 
  console.log(y); 
  return {r: pixel[0], g: pixel[1], b: pixel[2]};

}

function setVolume(y){
	var thresh = 20; 
	if(y < thresh){
		synth.volume.value = -10; 
	}
	else if(y >= thresh && y < thresh*2){
		synth.volume.value = -12; 
	}
	else if(y >= thresh*2 && y < thresh*3){
		synth.volume.value = -14; 
	}
	else if(y >= thresh*3 && y < thresh*4){
		synth.volume.value = -16; 
	}
	else if(y >= thresh*4 && y < thresh*5){
		synth.volume.value = -18; 
	}
	else if(y >= thresh*5 && y < thresh*6){
		synth.volume.value = -20; 
	}
	else if(y >= thresh*6 && y < thresh*7){
		synth.volume.value = -22; 
	}
	else if(y >= thresh*7 && y < thresh*8){
		synth.volume.value = -24; 
	}
	else if(y >= thresh*8 && y < thresh*9){
		synth.volume.value = -26; 
	}
	else if(y >= thresh*9 && y < thresh*10){
		synth.volume.value = -28; 
	}
	else if(y >= thresh*10 && y < thresh*11){
		synth.volume.value = -30; 
	}
	else if(y >= thresh*11 && y < thresh*12){
		synth.volume.value = -32; 
	}
	else if(y >= thresh*13 && y < thresh*14){
		synth.volume.value = -34; 
	}
	else{
		synth.volume.value = -36; 
	}
}

// Draw a colored rectangle on the canvas
function drawRect(rect, context, color) {
  context.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  console.log("Rect x, Rect y"); 
  console.log(rect.x); 
  console.log(rect.y); 
  console.log("Volume"); 
  setVolume(rect.y); 
  console.log(synth.volume.value); 
  document.getElementById("position").innerHTML = "Current Position  X: " + rect.x.toString() + " Y: " + rect.y.toString(); 
  var note = ""; 
//play a middle 'C' for the duration of an 8th note
	var dif = 50; 
	var noteLength = '64n';
	if(rect.x < dif){
		note = "C4"; 
		synth.triggerAttackRelease(note, noteLength)
	}
	else if(rect.x >= (dif) && rect.x < (dif*2)){
		note = "D4"; 
		synth.triggerAttackRelease(note, noteLength)
	
	}
	else if(rect.x >= (dif*2) && rect.x < (dif*3)){
		note = "E4"; 
		synth.triggerAttackRelease(note, noteLength)
	
	}
	else if(rect.x >= (dif*3) && rect.x < (dif*4)){
		note = "F4"; 
		synth.triggerAttackRelease(note, noteLength)
	
	}
	else if(rect.x >= (dif*4) && rect.x < (dif*5)){
		note = "D5";
		synth.triggerAttackRelease(note, noteLength)
		 
	}
	else if(rect.x >= (dif*5) && rect.x < (dif*6)){
		note = "E5"; 
		synth.triggerAttackRelease(note, noteLength)
	
	}
	else if(rect.x >= (dif*6) && rect.x < (dif*7)){
		note = "F5"; 
		synth.triggerAttackRelease(note, noteLength)
	
	}
	else if(rect.x >= (dif*7) && rect.x < (dif*8)){
		note = "C6"; 
	synth.triggerAttackRelease(note, noteLength)
	}
	else{
		note = "E6"; 
		synth.triggerAttackRelease(note,noteLength)
		
	}
	document.getElementById("note").innerHTML = "Current Note: " +note; 
}

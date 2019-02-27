var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.5);
var synth; 

var drums = false; 

var color = {r: 255, g: 0, b: 0};

function begin(){
	// Store the color we will be tracking (selectable by clicking on the webcam feed)
  //var color = {r: 255, g: 0, b: 0};

  // Grab reference to the tags we will be using
  var slider = document.getElementById("tolerance");
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');
  var swatch = document.getElementById("color");
  
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
  
}

window.addEventListener("load", function(e) {
  console.log("Page loaded!");
  // Store the color we will be tracking (selectable by clicking on the webcam feed)
  

  // Grab reference to the tags we will be using
  var slider = document.getElementById("tolerance");
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');
  var swatch = document.getElementById("color");
  var drumMachine = document.getElementById("drums");
  synth=new Tone.DuoSynth().chain(delay, reverb); 
  
  hideToggle("#test","#ui","#vid");
  

 document.querySelector("#gyro").addEventListener('mousedown', () => {
    console.log("Button clicked");
    Tone.context.resume();
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientationEvent supported");
        gyro = true; 
        document.getElementById("gyro").value = "Gyro Theremin ON"; 
        if (!listening) {
            console.log("Starting orientation capture");
            window.addEventListener('deviceorientation', orientationHandler, false);
        } else {
			gyro = false; 
			document.getElementById("gyro").value = "Gyro Theremin OFF";
			document.getElementById("status").innerHTML = "";
            console.log("Stopping orientation capture");
            window.removeEventListener('deviceorientation', orientationHandler, false);
        }
        listening = !listening;
    } else {
        console.log("DeviceMotionEvent is not supported.")
    }
})

/*
document.querySelector('#chord').addEventListener('touchstart', () => { 
	play(); 
})
document.querySelector('#chord').addEventListener('mousedown', () => { 
	play(); 
})
*/
document.querySelector('#test').addEventListener('mousedown',() => {
	 hideToggle("#test","#ui","#vid");
})

/*
document.querySelector('#chord').addEventListener('mousedown', () => { 

	polySynth.triggerAttack(['C3', 'E3', 'G3', 'B3']) 
})

document.querySelector('#chord').addEventListener('mouseup', () => { 
	polySynth.triggerRelease(['C3', 'E3', 'G3', 'B3']) 
})*/
/*
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
  
	*/
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
var gyro = false; 
var on = true; 

function drumToggle()
{
	if(drums == false){
		$("#drums").show();
		drums = true; 
	} else {
		$("#drums").hide();
		drums = false;  
	}
}

function hideToggle(button, elem, elem2) {
  if(on == true){
    $(elem).hide();
    $(elem2).hide();
    document.getElementById("test").value = "Webcam Theremin OFF"; 
    $("#chord").hide(); 
    document.getElementById("note").innerHTML = "";
    document.getElementById("position").innerHTML = ""; 
    //Tone.Master.mute = true;
    synth.dispose();  
    on = false;  
  } else{
	$("#chord").show(); 
	$(elem2).show();
    $(elem).show();
    begin(); 
    document.getElementById("test").value = "Webcam Theremin ON";
    var distortion = new Tone.Distortion(0.6)
	var tremolo = new Tone.Tremolo().start()
	synth=new Tone.DuoSynth().chain(delay, reverb); 
	//Tone.Master.mute = false;
	on = true;   
  }
}

 
function play(){

       var webcam = document.getElementById('webcam');
       if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: { facingMode: "user" }})
  .then(function(stream) {
    webcam.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log("Something went wrong!");
  });
}		
		
       webcam.play();
                 }

function stop(){
	var webcam = document.getElementById('webcam');
		
       webcam.pause();
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
  if(on == true){
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
	}
	if(on == false){
		document.getElementById("note").innerHTML = ""; 
		document.getElementById("position").innerHTML = "";  
	}else{
		document.getElementById("note").innerHTML = "Current Note: " +note; 
	}
}



var alpha = null;
var beta = null;
var gamma = null;

var interval = 10;

var listening = false;    

var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.5);
var synth2 =new Tone.DuoSynth().chain(delay, reverb);

var orientationHandler = function(event) {
	if(gyro == true){
    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
    console.log("Tone state: " + Tone.context.state);
    document.getElementById("status").innerHTML = "Alpha " + event.alpha + " Beta " + event.beta + " Gamma " + event.gamma;
    if (beta <= -160) {
        synth2.volume.value = -10
    } else if (beta <= -140 && beta > -160) {
        synth2.volume.value = -12;
    } else if (beta <= -120 && beta > -140) {
        synth2.volume.value = -14;
    } else if (beta <= -100 && beta > -120) {
        synth2.volume.value = -16;
    } else if (beta <= -80 && beta > -100) {
        synth2.volume.value = -18;
    } else if (beta <= -60 && beta > -80) {
        synth2.volume.value = -20;
    } else if (beta <= -40 && beta > -60) {
        synth2.volume.value = -22;
    } else if (beta <= -20 && beta > -40) {
        synth2.volume.value = -24;
    } else if (beta <= 0 && beta > -20) {
        synth2.volume.value = -26;
    } else if (beta <= 20 && beta > 0) {
        synth2.volume.value = -28;
    } else if (beta <= 40 && beta > 20) {
        synth2.volume.value = -30;
    } else if (beta <= 60 && beta > 40) {
        synth2.volume.value = -28;
    } else if (beta <= 80 && beta > 60) {
        synth2.volume.value = -30;
    } else if (beta <= 100 && beta > 80) {
        synth2.volume.value = -32;
    } else if (beta <= 120 && beta > 100) {
        synth2.volume.value = -34;
    } else if (beta <= 140 && beta >120) {
        synth2.volume.value = -36;
    } else if (beta <= 160 && beta > 140) {
        synth2.volume.value = -38;
    } else if (beta > 160) {
        synth2.volume.value = -40;
    } else {
        synth2.volume.value = -42;
    }

    console.log("synth2.volume.value: " + synth2.volume.value);

    if (gamma <= -70) {
        synth2.triggerAttackRelease("C1", "64n");
    } else if (gamma <= -60 && gamma > -70) {
        synth2.triggerAttackRelease("C2", "64n");
    } else if (gamma <= -50 && gamma > -60) {
        synth2.triggerAttackRelease("C3", "64n");
    } else if (gamma <= -40 && gamma > -50) {
        synth2.triggerAttackRelease("G3", "64n");
    } else if (gamma <= -30 && gamma > -40) {
        synth2.triggerAttackRelease("C4", "64n");
    } else if (gamma <= -20 && gamma > -30) {
        synth2.triggerAttackRelease("E4", "64n");
    } else if (gamma <= -10 && gamma > -20) {
        synth2.triggerAttackRelease("G4", "64n");
    } else if (gamma <= 0 && gamma > -10) {
        synth2.triggerAttackRelease("Bb5", "64n");
    } else if (gamma <= 10 && gamma > 0) {
        synth2.triggerAttackRelease("C5", "64n");
    } else if (gamma <= 20 && gamma > 10) {
        synth2.triggerAttackRelease("D5", "64n");
    } else if (gamma <= 30 && gamma > 20) {
        synth2.triggerAttackRelease("E5", "64n");
    } else if (gamma <= 40 && gamma > 30) {
        synth2.triggerAttackRelease("Gb5", "64n");
    } else if (gamma <= 50 && gamma > 40) {
        synth2.triggerAttackRelease("G5", "64n");
    } else if (gamma <= 60 && gamma > 50) {
        synth2.triggerAttackRelease("A6", "64n");
    } else if (gamma <= 70 && gamma > 60) {
        synth2.triggerAttackRelease("Bb6", "64n");
    } else if (gamma > 70) {
        synth2.triggerAttackRelease("B6", "64n");
    } else {
        synth2.triggerAttackRelease("C6", "64n");
    }
	}
};


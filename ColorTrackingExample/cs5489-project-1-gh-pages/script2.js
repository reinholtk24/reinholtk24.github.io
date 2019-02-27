

var alpha = null;
var beta = null;
var gamma = null;

var interval = 10;

var listening = false;    

var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.5);
var synth =new Tone.DuoSynth().chain(delay, reverb);

document.getElementById("connect").addEventListener("click", function() {
    console.log("Button clicked");
    Tone.context.resume();
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientationEvent supported");
        if (!listening) {
            console.log("Starting orientation capture");
            window.addEventListener('deviceorientation', orientationHandler, false);
        } else {
            console.log("Stopping orientation capture");
            window.removeEventListener('deviceorientation', orientationHandler, false);
        }
        listening = !listening;
    } else {
        console.log("DeviceMotionEvent is not supported.")
    }
});

var orientationHandler = function(event) {
    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
    console.log("Tone state: " + Tone.context.state);
    document.getElementById("status").innerHTML = "Alpha " + event.alpha + " Beta " + event.beta + " Gamma " + event.gamma;
    if (beta <= -160) {
        synth.volume.value = -10
    } else if (beta <= -140 && beta > -160) {
        synth.volume.value = -12;
    } else if (beta <= -120 && beta > -140) {
        synth.volume.value = -14;
    } else if (beta <= -100 && beta > -120) {
        synth.volume.value = -16;
    } else if (beta <= -80 && beta > -100) {
        synth.volume.value = -18;
    } else if (beta <= -60 && beta > -80) {
        synth.volume.value = -20;
    } else if (beta <= -40 && beta > -60) {
        synth.volume.value = -22;
    } else if (beta <= -20 && beta > -40) {
        synth.volume.value = -24;
    } else if (beta <= 0 && beta > -20) {
        synth.volume.value = -26;
    } else if (beta <= 20 && beta > 0) {
        synth.volume.value = -28;
    } else if (beta <= 40 && beta > 20) {
        synth.volume.value = -30;
    } else if (beta <= 60 && beta > 40) {
        synth.volume.value = -28;
    } else if (beta <= 80 && beta > 60) {
        synth.volume.value = -30;
    } else if (beta <= 100 && beta > 80) {
        synth.volume.value = -32;
    } else if (beta <= 120 && beta > 100) {
        synth.volume.value = -34;
    } else if (beta <= 140 && beta >120) {
        synth.volume.value = -36;
    } else if (beta <= 160 && beta > 140) {
        synth.volume.value = -38;
    } else if (beta > 160) {
        synth.volume.value = -40;
    } else {
        synth.volume.value = -42;
    }

    console.log("synth.volume.value: " + synth.volume.value);

    if (gamma <= -70) {
        synth.triggerAttackRelease("C1", "64n");
    } else if (gamma <= -60 && gamma > -70) {
        synth.triggerAttackRelease("C2", "64n");
    } else if (gamma <= -50 && gamma > -60) {
        synth.triggerAttackRelease("C3", "64n");
    } else if (gamma <= -40 && gamma > -50) {
        synth.triggerAttackRelease("G3", "64n");
    } else if (gamma <= -30 && gamma > -40) {
        synth.triggerAttackRelease("C4", "64n");
    } else if (gamma <= -20 && gamma > -30) {
        synth.triggerAttackRelease("E4", "64n");
    } else if (gamma <= -10 && gamma > -20) {
        synth.triggerAttackRelease("G4", "64n");
    } else if (gamma <= 0 && gamma > -10) {
        synth.triggerAttackRelease("Bb5", "64n");
    } else if (gamma <= 10 && gamma > 0) {
        synth.triggerAttackRelease("C5", "64n");
    } else if (gamma <= 20 && gamma > 10) {
        synth.triggerAttackRelease("D5", "64n");
    } else if (gamma <= 30 && gamma > 20) {
        synth.triggerAttackRelease("E5", "64n");
    } else if (gamma <= 40 && gamma > 30) {
        synth.triggerAttackRelease("Gb5", "64n");
    } else if (gamma <= 50 && gamma > 40) {
        synth.triggerAttackRelease("G5", "64n");
    } else if (gamma <= 60 && gamma > 50) {
        synth.triggerAttackRelease("A6", "64n");
    } else if (gamma <= 70 && gamma > 60) {
        synth.triggerAttackRelease("Bb6", "64n");
    } else if (gamma > 70) {
        synth.triggerAttackRelease("B6", "64n");
    } else {
        synth.triggerAttackRelease("C6", "64n");
    }
};

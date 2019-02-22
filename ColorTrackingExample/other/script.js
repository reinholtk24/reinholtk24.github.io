var alpha = null;
var beta = null;
var gamma = null;

document.getElementById('connect').onclick = function() {
    console.log("Button clicked");
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientationEvent supported");
        window.addEventListener('deviceorientation', function(event) {
            console.log("Detected orientation");
            console.log("alpha: " + event.alpha);
            alpha = event.alpha
            console.log("beta: " + event.beta);
            beta = event.beta
            console.log("gamma: " + event.gamma);
            gamma = event.gamma
            document.getElementById("status").innerHTML = "Alpha " + event.alpha + " Beta " + event.beta + " Gamma " + event.gamma;
            if (alpha > 30) {
                synth.triggerAttackRelease('C4', '64n');
            } else {
                synth.triggerAttackRelease('E6', '64n');
            }
            
        }, false);
        window.addEventListener('devicemotion', function(event) {
            console.log("Detected motion");
            console.log("acceleration: " + event.acceleration);
            document.getElementById("status").innerHTML = "Motion";
        }, false);
    } else {
        console.log("DeviceMotionEvent is not supported.")
    }
}

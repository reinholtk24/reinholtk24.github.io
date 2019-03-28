/* This file intentionally left blank. */


var downX = 0; 
var downY = 0; 


$( "#gestureArea" ).mouseup(function(e) {
	var upX = e.pageX; 
	var upY = e.pageY; 
	if(upX < downX){
		$("#gestureResult").text("swipe left");
	}
	else if(upX > downX) {
		  $("#gestureResult").text("swipe right");
	}
	else if(upX == downX) {
		  $("#gestureResult").text("mouse up");
	}
});

$( "#gestureArea" ).mousedown(function(e) {
  downX = e.pageX;
  downY = e.pageY; 
  
});

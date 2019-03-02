
var locations = ["Slum Lakes","Artillery","Relay","Wetlands","Cascades","The Pit","Runoff","Bunker","Swamps","Airbase","Bridges","Hydro Dam","Repulsor","Market","Skull Town","Thunderdome","Water Treatment","Hot Zone Boys","Ship Bitches","Jump Master Picks Boys"]

window.addEventListener("load", function(e) {
	
	document.querySelector('#test').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * locations.length);
		 document.getElementById("status").innerHTML = locations[rand];
	})
	
});

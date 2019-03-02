
var locations = ["Slum Lakes","Artillery","Relay","Wetlands","Cascades","The Pit","Runoff","Bunker","Swamps","Airbase","Bridges","Hydro Dam","Repulsor","Market","Skull Town","Thunderdome","Water Treatment","Hot Zone Boys","Ship Bitches","Jump Master Picks Boys"]
var characters = ["Bloodhound","Gibraltar","Lifeline","Pathfinder","Wraith","Bangalore","Caustic","Mirage"]
var insults = ["Idiot", "Turkey boy", "Poop head", "Baby Head", "Dummy baby boy", "Pizza boy", "little biscuit bitch"]


window.addEventListener("load", function(e) {
	
	document.querySelector('#test').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * locations.length);
		 document.getElementById("status").innerHTML = "Location: " + locations[rand];
	})
	
	document.querySelector('#char').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * characters.length);
		 document.getElementById("characters").innerHTML = "Character: " + characters[rand];
	})
	
	document.querySelector('#codyButton').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * insults.length);
		 document.getElementById("cody").innerHTML = "Insult: " + insults[rand];
	})
	
	
});

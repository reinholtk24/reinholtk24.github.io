
var locations = ["Slum Lakes","Artillery","Relay","Wetlands","Cascades","The Pit","Runoff","Bunker","Swamps","Airbase","Bridges","Hydro Dam","Repulsor","Market","Skull Town","Thunderdome","Water Treatment","Hot Zone Boys","Ship Bitches","Jump Master Picks Boys"]
var characters = ["Bloodhound","Gibraltar","Lifeline","Pathfinder","Wraith","Bangalore","Caustic","Mirage", "Octane", "Wattson"]
var insults = ["Baby Head", "Dummy baby boy", "Pizza boy", "little biscuit bitch" , "Dino head", "Sand boy"]
var guns = ["VK-47","Flatline","Alternator","Mozambique","G7 Scout","P2020","Havoc","Prowler","Peacekeeper","Longbow DMR","RE-45 Auto","Hemlok","R-99","EVA-8 Auto","Triple Take","Wingman","R-301 Carbine","M600 Spitfire","Mastiff","Kraber .50-CAL","Devotion","L-Star EMG"]


window.addEventListener("load", function(e) {
	
	document.querySelector('#test').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * locations.length);
		 document.getElementById("status").innerHTML = "Location: " + locations[rand];
	})
	
	document.querySelector('#char').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * characters.length);
		 document.getElementById("characters").src= "Characters/" + characters[rand] + ".jpg";
		 document.getElementById("characters").width = 200;
		 document.getElementById("characters").height = 250; 
		 //document.getElementById("characters").innerHTML = "Character: " + characters[rand];
	})
	
	document.querySelector('#codyButton').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * insults.length);
		 document.getElementById("cody").innerHTML = "Insult: " + insults[rand];
	})
	
	document.querySelector('#win').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * 100 );
		 var rand2 = Math.floor(Math.random() * 100); 
		 document.getElementById("chance").innerHTML = "Win Chance: " + rand + "." + rand2 + "%";
	})
	
	document.querySelector('#gun').addEventListener('mousedown',() => {
		 var rand = Math.floor(Math.random() * guns.length);
		 document.getElementById("guns").innerHTML = "Main Weapon: " + guns[rand];
	})
	
	
});

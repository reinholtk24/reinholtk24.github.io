
$(document).ready(function() { // do this when the document is loaded
	$("#content_dialer").show(); // show the element with ID "element"
	$("#content_list").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
	var b1 = $("#button1")
	b1.css("color","black");
	b1.css("background","white");
	b1.css("border-bottom","none");
	b1.css("border-left",".2px solid");
	b1.css("border-top",".2px solid");
});

function stext() {
    var but = document.getElementById("#button1"); 
    but.style.color="black";
    
}

$("#button1").click(function() { // when "button_id" is clicked
	$("#content_dialer").show(); // show element
	$("#content_list").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
	$(this).css("color","black");
	$(this).css("background","white");
	$(this).css("border-bottom","none");
	$(this).css("border-left",".2px solid");
	$(this).css("border-top",".2px solid");
	$("#button2").css("background","grey");
	$("#button3").css("background","grey"); 
	$("#button2").css("color","white");
	$("#button3").css("color","white");
});

$("#button2").click(function() { // when "button_id" is clicked
	$("#content_list").show(); // show element
	$("#content_dialer").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
	$(this).css("color","black");
	$(this).css("background","white");
	$(this).css("border-bottom","none");
	$(this).css("border-left",".2px solid");
	$(this).css("border-top",".2px solid");
	$("#button1").css("background","grey");
	$("#button3").css("background","grey"); 
	$("#button1").css("color","white");
	$("#button3").css("color","white");
	
});

$("#button3").click(function() { // when "button_id" is clicked
	$("#content_add").show(); // show element
	$("#content_dialer").hide(); // hide the element with ID "otherElement"
	$("#content_list").hide();
	$(this).css("color","black");
	$(this).css("background","white");
	$(this).css("border-bottom","none");
	$(this).css("border-left",".2px solid");
	$(this).css("border-top",".2px solid");
	$("#button2").css("background","grey");
	$("#button1").css("background","grey"); 
	$("#button2").css("color","white");
	$("#button1").css("color","white");
});

$("#button3").click(function() { // when "button_id" is clicked
	$("#content_add").show(); // show element
	$("#content_dialer").hide(); // hide the element with ID "otherElement"
	$("#content_list").hide();
});

$("#1").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "1"); 
	
});

$("#2").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "2"); 
	
});

$("#3").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "3"); 
	
});

$("#4").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "4"); 
	
});

$("#5").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "5"); 
	
});

$("#6").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "6"); 
	
});

$("#7").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "7"); 
	
});

$("#8").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "8"); 
	
});

$("#9").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "9"); 
	
});

$("#pound").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "#"); 
	
});

$("#star").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "*"); 
	
});

$("#star").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val($nums.val() + "*"); 
	
});

$("#0").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	
	$nums.val($nums.val() + "0"); 
	
});

$("#clear").click(function() { // when "button_id" is clicked
	var $nums = $('#inputDialer');
	$nums.val(""); 
	
});


$(document).ready(function() { // do this when the document is loaded
	$("#content_dialer").show(); // show the element with ID "element"
	$("#content_list").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
	alert("hi");
});

$("#button1").click(function() { // when "button_id" is clicked
	$("#content_dialer").show(); // show element
	$("#content_list").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
});

$("#button2").click(function() { // when "button_id" is clicked
	$("#content_list").show(); // show element
	$("#content_dialer").hide(); // hide the element with ID "otherElement"
	$("#content_add").hide();
});

$("#button3").click(function() { // when "button_id" is clicked
	$("#content_add").show(); // show element
	$("#content_dialer").hide(); // hide the element with ID "otherElement"
	$("#content_list").hide();
});



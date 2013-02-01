// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){
	$("#chatTitle").click(function(){
		var chatWindow = $("#chat");
		if(chatWindow.attr('data-state') === 'minimized') {
			chatWindow.attr('data-state', 'window');
		}
		else {
			chatWindow.attr('data-state', 'minimized');	
		}
	});

	$("#chatForm").submit(function() {
		//Do the AJAX post
		$.post($("#chatForm").attr("action"), $("#chatForm").serialize(), function(data) {
			var message = $("#message").val();
			$("#message").val("");
			$("#chatText").append("<b>You:</b> " + message + "<br />");
		});

		//Important. Stop the normal POST
		return false;
	});

	
	setInterval(function(){
		$.get('/chat/getmessages', function(data) {
	  		for(var i=0; i<data.length; i++) {
	  			var message = data[i].message;
	  			var from = data[i].from;
	  			$("#chatText").append("<b>" + from + ":</b> " + message + "<br />");
	  		}
		}, "json");
	}, 1000);
	
});
(function() {

  var user_name, api_key;
  
  user_name = "svinkle";
  api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";

  $("#twitch-widget").attr("href","http://twitch.tv/" + user_name);

  $.getJSON('https://api.twitch.tv/kraken/streams/' + user_name + '?client_id=' + api_key + '&callback=?', function(data) {	
	  if (data.stream) {
		  $("#twitch-widget").html("<span class='online'></span> Online! Playing: " + data.stream.game + "<span class='viewers'>Viewers: " + data.stream.viewers + "</span>");
	  } else {
		  $("#twitch-widget").html("<span class='offline'></span> Offline");
	  }  
  });

})();
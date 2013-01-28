(function() {
	var user_name, api_key, query_string;  

	api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";
	
	query_string = function () {	
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		
		for ( var i = 0; i < vars.length; i++ ) {
			var pair = vars[i].split("=");
			if ( typeof query_string[pair[0]] === "undefined" ) {
				query_string[pair[0]] = pair[1];
			} else if ( typeof query_string[pair[0]] === "string" ) {
				var arr = [ query_string[pair[0]], pair[1] ];
				query_string[pair[0]] = arr;
			} else {
				query_string[pair[0]].push(pair[1]);
			}
		} 
		
		return query_string;
	}();	
	
	user_name = query_string.username;

	if (typeof(user_name) === 'undefined' || user_name === "") {
		$("#twitch-widget").html("<ul><li>Please add a username</li></ul>");
	} else {
		$.getJSON('https://api.twitch.tv/kraken/streams/' + user_name + '?client_id=' + api_key + '&callback=?', function(data) {	
			console.log(JSON.stringify(data));
			if (data.stream) {
				$("#twitch-widget").html("<ul><li><a href='http://twitch.tv/" + user_name + "' class='user-name'>" + user_name + "</a></li><li><b>LIVE</b> <span class='online'></span> " + (data.stream.game ? "<a href='http://www.twitch.tv/directory/game/" + encodeURIComponent(data.stream.game) + "'>" + data.stream.game + "</a>" : "") + "</li><li><span class='viewers'>Viewers: " + data.stream.viewers + "</span></li></ul>");
			} else {
				$("#twitch-widget").html("<ul><li><a href='http://twitch.tv/" + user_name + "' class='user-name'>" + user_name + "</a></li><li><b>Offline</b></li></ul>");
			}  
		});	
	}

})();
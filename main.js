$(document).ready(function() {
    var $body = $('#scrollbox');
    var autoRefreshEnabled = true; //Tracks if the tweets will update
    var spotlightUser = ''; //Tracks if a user is highlighted
	var username; //To store a username

    function refreshTweets() {

        var index = 0;
        while (index <= streams.home.length - 1) {
            var tweet = streams.home[index];
            var $tweet = $('<div class="userTweet ' + tweet.user + '"></div>');
            $tweet.html('@<button class="userButton">' + tweet.user + '</button>: <span class="tweet">' +
                tweet.message + '</span><br><span class="timestamp">' + tweet.created_at + '</span>');
            $tweet.attr('id', 'tweet' + index);
            if ($('#tweet' + index).length === 0) $tweet.prependTo($body);
            index += 1;
        }
        if (spotlightUser != "") showSpotlightUser(0);
    }

    function showSpotlightUser(speed) {
        $('.userTweet').not('.' + spotlightUser).hide(speed);
    }

    function showAllUsers(speed) {
        spotlightUser = '';
        $('.userTweet').show(speed);
    }

    function clearTweets() {
        $('.userTweet').remove();
    }
	
	function sendTweet() {
		var tweet = {};
		tweet.user = username;
		tweet.message = $('#inputTweet').val();
		$('#inputTweet').val('');
		tweet.created_at = new Date();
		addTweet(tweet);
		refreshTweets();
		
	}
	
	//Prompt user for a username to tweet as and create the user
	username = prompt('Please enter a username.');
	if (username === null) username = "Anonymous";
	streams.users[username] = [];
	$('#username').text(username);

    //Initial refresh and interval
    refreshTweets();
    setInterval(function() {
        if (autoRefreshEnabled) refreshTweets();
    }, 10000);

    //Manual refresh
    $('#refreshButton').on('click', refreshTweets);
	
	//Tweet sending
	$('#sendButton').on('click', sendTweet);
	
	$("#inputTweet").keyup(function(event){
    if(event.keyCode == 13){
        $("#sendButton").click();
    }
});

    //Toggle auto refresh
    $('#toggleRefreshButton').on('click', function() {
        autoRefreshEnabled = !autoRefreshEnabled;
		if (autoRefreshEnabled) {
			$('#toggleRefreshButton').removeClass('selectToggle');
			$('#toggleRefreshButton').text('Disable Auto-Refresh');
		} else {
			$('#toggleRefreshButton').addClass('selectToggle');
			$('#toggleRefreshButton').text('Enable Auto-Refresh');
		}
        $('#autoRefreshStatus').text('Auto-Refresh: ' + autoRefreshEnabled);
    });


    //User buttons
    $('#scrollbox').on('click', '.userButton', function() {
        var user = $(this).text();
        if (spotlightUser != '') {
            showAllUsers(200);
        } else {
            spotlightUser = user;
            showSpotlightUser(200);
        }

    });

});
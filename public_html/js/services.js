statboard.service('googleLogin', function(){
    
    var clientId = '384633511502-6lsj9v6qe0kf6t5slvncr19s50mv2nbh.apps.googleusercontent.com';
    var apiKey = 'AIzaSyCqQ06vyFDPyBXOVp1s2iVlZ98ebW0r22I';
    var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

    this.login = function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth, 1);
    };

    function checkAuth() {
  	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    }

    function handleAuthResult(authResult) {
  	if (authResult) {
    	loadAnalyticsClient();
  	} else {
    	handleUnAuthorized();
  	}
    }

    function handleUnAuthorized() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
    }

    function loadAnalyticsClient() {
  	gapi.client.load('analytics', 'v3', handleAuthorized);
    }

    function handleAuthorized() {
	console.log("User is logged in");
    }
});
// INCLUDES
var libs = {
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/xp/thymeleaf'),
    httpClient: require('/lib/xp/http-client')
};



function getStatusJSON(url) {
    var response = libs.httpClient.request({
        url: url,
        method: 'GET',
        contentType: 'application/json'
    });

    //log.info("response: " + JSON.stringify(response, null, 2));
    return JSON.parse(response.body);
}



function getClusterMembers(url) {
    var response = libs.httpClient.request({
        url: url,
        method: 'GET',
        contentType: 'application/json'
    });

    var cluster = JSON.parse(response.body);

    var members = [];


    for (var i = 0; i < cluster.members.length; i++) {

		var currentMember = cluster.members[i];

		members.push(currentMember);
	}


    return members;
}



function getTimeStamp() {
	
	var d = new Date(Date.now());

	return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}



exports.get = function(req) {

  return {
    body: {
    	timeStamp: getTimeStamp(),
		server: getStatusJSON('http://localhost:8080/status/server'),
        jvmInfo: getStatusJSON('http://localhost:8080/status/jvm.info'),
        jvmMemory: getStatusJSON('http://localhost:8080/status/jvm.memory'),
        cluster: getStatusJSON('http://localhost:8080/status/cluster'),
        members: getClusterMembers('http://localhost:8080/status/cluster')
    },
    contentType: 'application/json'
  };

};
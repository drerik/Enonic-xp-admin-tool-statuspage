// INCLUDES
var libs = {
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/xp/thymeleaf'),
    httpClient: require('/lib/xp/http-client')
};

var settings = {
    viewFile: 'statuspage.html'
};




/*
function handleGet(req) {

    portal.portalUrl

    var view = resolve('.html');
    var params = {
        launcherJsUrl: portal.assetUrl({path: "/js/launcher.js", application: "com.enonic.xp.admin.ui"})
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
}
exports.get = handleGet;
*/




function getStatusJSON(url) {
    var response = libs.httpClient.request({
        url: url,
        method: 'GET',
        contentType: 'application/json'
    });

    //log.info("response: " + JSON.stringify(response, null, 2));
    return JSON.parse(response.body);
}




// Handle the GET request
exports.get = function(req) {



    // MODEL
    var model = {
        /*
        launcherJsUrl: libs.portal.assetUrl({
            path: "/js/launcher.js",
            application: "com.enonic.xp.admin.ui"},
        )*/
        server: getStatusJSON('http://localhost:8080/status/server'),
        jvmInfo: getStatusJSON('http://localhost:8080/status/jvm.info'),
        jvmMemory: getStatusJSON('http://localhost:8080/status/jvm.memory'),
        cluster: getStatusJSON('http://localhost:8080/status/cluster')
    };

    // RENDERING
    var view = resolve(settings.viewFile);
    var body = libs.thymeleaf.render(view, model);

    return { body: body };

};

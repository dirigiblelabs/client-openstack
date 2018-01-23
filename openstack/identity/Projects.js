var Api = require("openstack/Api").prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Projects.prototype = Object.create(Api);

method.constructor = Projects;

function Projects(token) {
    Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
    	'host': ServiceRegistry.getIdentityService(),
    	'version': 'v3',
    	'kind': 'projects'
    };
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{kind}}';
};

method.list = function(queryParameters) {
    var response = Api.list.call(this, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.projects;
};

method.get = function(id, queryParameters) {
    var response = Api.get.call(this, id, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.project;
};

module.exports = Projects;

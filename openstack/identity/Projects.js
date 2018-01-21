var Api = require("openstack/Api").prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Projects.prototype = Object.create(Api);

method.constructor = Projects;

function Projects(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getIdentityService(),
    	'version': 'v3',
    	'kind': 'projects'
    }]);
}

module.exports = Projects;

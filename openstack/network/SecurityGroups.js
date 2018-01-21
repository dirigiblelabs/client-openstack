var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = SecurityGroups.prototype = Object.create(Api);

method.constructor = SecurityGroups;

function SecurityGroups(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'security-groups'
    }]);
}

module.exports = SecurityGroups;

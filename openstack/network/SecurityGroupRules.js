var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = SecurityGroupRules.prototype = Object.create(Api);

method.constructor = SecurityGroupRules;

function SecurityGroupRules(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'security-group-rules'
    }]);
}

module.exports = SecurityGroupRules;

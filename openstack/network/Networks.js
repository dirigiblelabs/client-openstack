var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Networks.prototype = Object.create(Api);

method.constructor = Networks;

function Networks(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'networks'
    }]);
}

module.exports = Networks;

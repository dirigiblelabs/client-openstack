var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = FloatingIps.prototype = Object.create(Api);

method.constructor = FloatingIps;

function FloatingIps(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'floatingips'
    }]);
}

module.exports = FloatingIps;

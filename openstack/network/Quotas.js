var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Quotas.prototype = Object.create(Api);

method.constructor = Quotas;

function Quotas(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'quotas'
    }]);
}

module.exports = Quotas;

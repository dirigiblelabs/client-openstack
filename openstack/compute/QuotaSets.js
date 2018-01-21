var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = QuotaSets.prototype = Object.create(Api);

method.constructor = QuotaSets;

function QuotaSets(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getComputeService(),
    	'version': 'v2.1',
    	'kind': 'os-quota-sets'
    }]);
}

module.exports = QuotaSets;

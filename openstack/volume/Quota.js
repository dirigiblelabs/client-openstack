var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Quota.prototype = Object.create(Api);

method.constructor = Quota;

function Quota(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getVolumeService(),
    	'version': 'v2',
    	'kind': 'os-quota-sets'
    }]);
}

module.exports = Quota;

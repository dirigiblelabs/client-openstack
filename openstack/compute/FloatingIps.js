var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = FloatingIpsApi.prototype = Object.create(Api);

method.constructor = FloatingIpsApi;

function FloatingIpsApi(token) {
    Api.constructor.apply(this, [token, {
    	'host': ServiceRegistry.getComputeService(),
    	'version': 'v2.1',
    	'kind': 'os-floating-ips'
    }]);
}

method.list = function() {
    var response = Api.list.call(this);
    return JSON.parse(response.text);
};

method.get = function(id) {
    var response = Api.get.call(this, [id]);
    return JSON.parse(response.text);
};

module.exports = FloatingIpsApi;

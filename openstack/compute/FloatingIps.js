var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = FloatingIpsApi.prototype = Object.create(Api);

method.constructor = FloatingIpsApi;

function FloatingIpsApi(token) {
	Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
		'host': ServiceRegistry.getComputeService(),
		'version': 'v2.1',
		'kind': 'os-floating-ips'
	};
};

method.list = function(queryParameters) {
	var response = Api.list.call(this, queryParameters);
	var entity = JSON.parse(response.text);
	return entity.floating_ips;
};

method.get = function(id, queryParameters) {
	var response = Api.get.call(this, id, queryParameters);
	var entity = JSON.parse(response.text);
	return entity.floating_ip;
};

module.exports = FloatingIpsApi;

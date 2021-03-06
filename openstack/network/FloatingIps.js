var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = FloatingIps.prototype = Object.create(Api);

method.constructor = FloatingIps;

function FloatingIps(token) {
	Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
		'host': ServiceRegistry.getNetworkService(),
		'version': 'v2.0',
		'kind': 'floatingips'
	};
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{kind}}';
};

method.list = function(queryParameters) {
	let response = Api.list.call(this, queryParameters);
	let entity = JSON.parse(response.text);
	return entity.floatingips;
};

method.get = function(id, queryParameters) {
	let response = Api.get.call(this, id, queryParameters);
	let entity = JSON.parse(response.text);
	return entity.floatingip;
};

module.exports = FloatingIps;

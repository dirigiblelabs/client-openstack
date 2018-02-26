var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = QuotaSets.prototype = Object.create(Api);

method.constructor = QuotaSets;

function QuotaSets(token) {
	Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
		'host': ServiceRegistry.getComputeService(),
		'version': 'v2.1',
		'kind': 'os-quota-sets'
	};
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{projectId}}/{{kind}}/{{projectId}}';
};

method.list = function(queryParameters) {
	let response = Api.list.call(this, queryParameters);
	let entity = JSON.parse(response.text);
	return entity.quota_set;
};

method.get = function(queryParameters) {
	return this.list(queryParameters);
};

module.exports = QuotaSets;

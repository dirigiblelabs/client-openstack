var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Quotas.prototype = Object.create(Api);

method.constructor = Quotas;

function Quotas(token) {
    Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'quotas'
    };
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{kind}}';
};

method.list = function(queryParameters) {
    var response = Api.list.call(this, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.quotas;
};

method.get = function(id, queryParameters) {
    var response = Api.get.call(this, id, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.quota;
};

module.exports = Quotas;

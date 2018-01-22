var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Networks.prototype = Object.create(Api);

method.constructor = Networks;

function Networks(token) {
    Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
    	'host': ServiceRegistry.getNetworkService(),
    	'version': 'v2.0',
    	'kind': 'networks'
    };
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{kind}}';
};

method.list = function() {
    var response = Api.list.call(this);
    var entity = JSON.parse(response.text);
    return entity.networks;
};

method.get = function(id) {
    var response = Api.get.call(this, [id]);
    var entity = JSON.parse(response.text);
    return entity;
};

module.exports = Networks;

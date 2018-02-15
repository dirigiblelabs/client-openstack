var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Servers.prototype = Object.create(Api);

var httpClient = require('http/v3/client');

method.constructor = Servers;

function Servers(token) {
    Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
    	'host': ServiceRegistry.getComputeService(),
    	'version': 'v2.1',
    	'kind': 'servers'
    };
};

method.list = function(queryParameters) {
    var response = Api.list.call(this, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.servers;
};

method.listDetails = function(queryParameters) {
	let pattern = this.getApiPattern();
	let api = this.getApi(pattern) + '/detail';
	api += this.getQueryParameters(queryParameters);
	let options = this.getOptions();
	let response = httpClient.get(api, options);
	let entity = JSON.parse(response.text);
	return entity.servers;
};

method.get = function(id, queryParameters) {
    var response = Api.get.call(this, id, queryParameters);
    var entity = JSON.parse(response.text);
    return entity.server;
};

module.exports = Servers;

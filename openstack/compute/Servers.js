var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Servers.prototype = Object.create(Api);

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

method.list = function() {
    var response = Api.list.call(this);
    var entity = JSON.parse(response.text);
    return entity.servers;
};

method.get = function(id) {
    var response = Api.get.call(this, [id]);
    var entity = JSON.parse(response.text);
    return entity.server;
};

module.exports = Servers;

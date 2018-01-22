var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Quota.prototype = Object.create(Api);

method.constructor = Quota;

function Quota(token) {
    Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
    	'host': ServiceRegistry.getVolumeService(),
    	'version': 'v2',
    	'kind': 'os-quota-sets'
    };
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{projectId}}/{{kind}}/{{projectId}}';
};

method.list = function() {
    var response = Api.list.call(this);
    var entity = JSON.parse(response.text);
    return entity.quota_set;
};

method.get = function() {
    return this.list();
};

module.exports = Quota;

var Api = require('openstack/Api').prototype;
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = SecurityGroupRules.prototype = Object.create(Api);

method.constructor = SecurityGroupRules;

function SecurityGroupRules(token) {
	Api.constructor.apply(this, [token]);
}

method.getMetadata = function() {
	return {
		'host': ServiceRegistry.getNetworkService(),
		'version': 'v2.0',
		'kind': 'security-group-rules'
	};
};

method.getApiPattern = function() {
	return '{{host}}/{{version}}/{{kind}}';
};

method.list = function(queryParameters) {
	let response = Api.list.call(this, queryParameters);
	let entity = JSON.parse(response.text);
	return entity.security_group_rules;
};

method.get = function(id, queryParameters) {
	let response = Api.get.call(this, id, queryParameters);
	let entity = JSON.parse(response.text);
	return entity.security_group_rule;
};

module.exports = SecurityGroupRules;

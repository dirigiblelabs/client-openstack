var httpClient = require('http/v3/client');
var ServiceRegistry = require('openstack/ServiceRegistry');
var method = Auth.prototype;

function Auth() {
	// Empty constructor
}

method.authenticate = function(domain, user, password) {
	this.authenticate(domain, user, password, null);
};

method.authenticate = function(domain, user, password, projectId) {
	var api = this.getApi() + '/v3/auth/tokens';
	var entity = this.getEntity(domain, user, password, projectId);
	var options = {};
	options.text = JSON.stringify(entity);
	options.contentType = 'application/json';
	var response = httpClient.post(api, options);
	if (response.statusCode !== 201) {
		let errorMessage = response.statusCode + ' | ' + response.text;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
	var token = JSON.parse(response.text);
	token.token.value = getAuthToken(response.headers);
	return token;
};

method.getApi = function() {
	return ServiceRegistry.getIdentityService();
};

method.getEntity = function(domain, user, password, projectId) {
	var authEntity = {
		'auth': {
			'identity': {
				'password': {
					'user': {
						'domain': {
							'name': domain
						},
						'name': user,
						'password': password
					}
				},
				'methods': [
					'password'
				]
			}
		}
	};
	authEntity.auth.scope = {};
	if (projectId) {
		authEntity.auth.scope.project = {};
		authEntity.auth.scope.project.id = projectId;
	} else {
		authEntity.auth.scope.domain = {};
		authEntity.auth.scope.domain.name = domain;
	}
	return authEntity;
};

function getAuthToken(headers) {
	for (var i = 0 ; i < headers.length; i++) {
		if (headers[i].name === 'X-Subject-Token') {
			return headers[i].value;
		}
	}
	return null;
}
module.exports = Auth;

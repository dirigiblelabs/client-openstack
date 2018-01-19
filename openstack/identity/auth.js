/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.authenticate = function(domain, username, password, projectId) {
	var url = serviceEndpoints.getIdentityService() + '/v3/auth/tokens';

	var response = httpClient.post(url, {
		'headers': [{
			'name': 'Content-Type',
			'value': 'application/json'
		}],
		'body': JSON.stringify(createAuthBody(domain, username, password, projectId))
	});

	if (response.statusCode !== httpResponse.CREATED) {
		console.error('Error occured during OpenStack authentication: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	var auth = {
		'token': getAuthToken(response.headers),
		'entity': JSON.parse(response.data)
	};

	return auth;
};

function createAuthBody(domain, username, password, projectId) {
	var authBody = {
		'auth': {
			'identity': {
				'password': {
					'user': {
						'domain': {
								'name': domain
						},
						'name': username,
						'password': password
					}
				},
				'methods': [
					'password'
				]	
			}
		}
	};
	if (projectId !== null && projectId !== undefined) {
		authBody.auth.scope = {
			'project': {
				'id': projectId
			}
		};
	}

	return authBody;
}

function getAuthToken(headers) {
	for (var i = 0 ; i < headers.length; i ++) {
		if (headers[i].name === 'X-Subject-Token') {
			return headers[i].value;
		}
	}
	return null;
}
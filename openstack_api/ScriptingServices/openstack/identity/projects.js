/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.listAll = function(auth) {
	var url = serviceEndpoints.getIdentityService() + '/v3/projects';

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing All Projects: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	console.log(response.data);
	return JSON.parse(response.data).projects;
};

exports.list = function(auth) {
	var url = serviceEndpoints.getIdentityService() + '/v3/auth/projects';

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing Projects: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	console.log(response.data);
	return JSON.parse(response.data).projects;
};
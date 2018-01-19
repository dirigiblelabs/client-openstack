/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.list = function(auth, queryOptions) {
	var url = serviceEndpoints.getComputeService() + '/v2.1/' + auth.entity.token.project.id + '/servers';
	url = addQueryOptions(url, queryOptions);

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing Servers: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data).servers;
};

exports.listDetails = function(auth, queryOptions) {
	var url = serviceEndpoints.getComputeService() + '/v2.1/' + auth.entity.token.project.id + '/servers/detail';
	url = addQueryOptions(url, queryOptions);

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing Servers: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data).servers;
};

function addQueryOptions(url, queryOptions) {
	if (queryOptions !== undefined && queryOptions !== null) {
		for (var i = 0; i < queryOptions.length; i++) {
			var option = queryOptions[i];
			if (option.name !== undefined && option.name !== null && option.value !== undefined && option.value !== null) {
				if (i === 0) {
					url = url + '?' + option.name + '=' + option.value;
				} else {
					url = url + '&' + option.name + '=' + option.value;
				}
			}
		}
	}
	return url;
}

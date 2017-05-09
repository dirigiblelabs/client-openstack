/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.list = function(auth) {
	var url = serviceEndpoints.getNetworkService() + '/v2.0/networks';

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing Networks: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data).networks;
};
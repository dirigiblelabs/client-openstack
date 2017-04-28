/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.delete = function(auth, floatingIpId) {
	var url = serviceEndpoints.getComputeService() + '/v2.1/' + auth.entity.token.project.id + '/os-floating-ips/' + floatingIpId;

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during deleting Floating IP: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	console.log(response.data);
	return JSON.parse(response.data);
};

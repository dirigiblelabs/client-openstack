/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('http/v3/response');
var httpClient = require('http/v3/client');

exports.delete = function(auth, floatingIpId) {
	var url = serviceEndpoints.getComputeService() + '/v2.1/' + auth.entity.token.project.id + '/os-floating-ips/' + floatingIpId;

	var response = httpClient.delete(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	var isAccepted = response.statusCode === httpResponse.ACCEPTED;

	if (!isAccepted) {
		console.error('Error occured during deleting Floating IP: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return isAccepted;
};

/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.updateQuota = function(auth, projectId, quota) {
	var url = serviceEndpoints.getComputeService() + '/v2.1/' + auth.entity.token.project.id + '/os-quota-sets/' + projectId;
	
	var response = httpClient.put(url, {
		'headers': [{
			'name': 'Content-Type',
			'value': 'application/json'
		}, {
			'name': 'X-Auth-Token',
			'value': auth.token
		}],
		'body': JSON.stringify(quota)
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during Compute Quota update: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data);
};
/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpoints = require('openstack/serviceEndpoints');
var httpResponse = require('net/http/response');
var httpClient = require('net/http/client');

exports.list = function(auth, queryOptions) {
	var url = serviceEndpoints.getNetworkService() + '/v2.0/security-group-rules';
	url = addQueryOptions(url, queryOptions);

	var response = httpClient.get(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}]
	});

	if (response.statusCode !== httpResponse.OK) {
		console.error('Error occured during listing Security Group Rules: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data).security_group_rules;
};

exports.create = function(auth, securityGroupRule) {
	var url = serviceEndpoints.getNetworkService() + '/v2.0/security-group-rules';

	var response = httpClient.post(url, {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': auth.token
		}, {
			'name': 'Content-Type',
			'value': 'application/json'
		}],
		'body': JSON.stringify(securityGroupRule)
	});

	if (response.statusCode !== httpResponse.CREATED) {
		console.error('Error occured during creating Security Group Rule: [' + response.statusCode + '] ' + response.statusMessage);
		console.error('Error response: ' + response.data);
	}

	return JSON.parse(response.data).security_group_rule;
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

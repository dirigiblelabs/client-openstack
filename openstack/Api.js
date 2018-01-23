/*eslint-disable no-extend-native */

var method = Api.prototype;

const httpClient = require('http/v3/client');
const API_PATTERN = '{{host}}/{{version}}/{{projectId}}/{{kind}}';

function Api(token) {
	this.token = token;
}

// The method should be implemeted from the subclass
method.getMetadata = function() {
	let errorMessage = 'The getMetadata() method is not implemented!';
	console.error(errorMessage);
	throw new Error(errorMessage);
};

method.getApiPattern = function() {
	return API_PATTERN;
};

method.getOptions = function() {
	return {
		'headers': [{
			'name': 'X-Auth-Token',
			'value': this.token.token.value
		}]
	};
};

method.list = function() {
	let pattern = this.getApiPattern();
	let api = getApi(pattern, this.getMetadata(), this.token);
	let options = this.getOptions();
	let response = httpClient.get(api, options);
	return response;
};

method.get = function(id) {
	// TODO Validate the Id?
	let pattern = this.getApiPattern();
	let api = getApi(pattern, this.getMetadata(), this.token)
	api += '/' + id;
	let options = this.getOptions();
	let response = httpClient.get(api, options);
	if (response.statusCode !== 200) {
		let errorMessage = response.statusCode + ' | ' + response.text;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
	return response;
};

method.create = function(entity) {
	// TODO Validate the Entity?
	let pattern = this.getApiPattern();
	let api = getApi(pattern, this.getMetadata(), this.token)
	let options = this.getOptions();
	options.data = entity;
	options.contentType = 'application/json';
	let response = httpClient.post(api, options);
	if (response.statusCode !== 200) {
		let errorMessage = response.statusCode + ' | ' + response.text;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
	return response;
};

method.update = function(id, entity) {
	// TODO Validate the Id and the Entity?
	let pattern = this.getApiPattern();
	let api = getApi(pattern, this.getMetadata(), this.token)
	api += '/' + id;
	let options = this.getOptions();
	options.data = entity;
	options.contentType = 'application/json';
	let response = httpClient.put(api, options);
	return response;
};

method.delete = function(id) {
	// TODO Validate the Id?
	let pattern = this.getApiPattern();
	let api = getApi(pattern, this.getMetadata(), this.token)
	api += '/' + id;
	let options = this.getOptions();
	let response = httpClient.delete(api, options);
	return response;
};

function getApi(pattern, metadata, token) {
	let url = pattern
		.replaceAll('{{host}}', metadata.host)
		.replaceAll('{{version}}', metadata.version)
		.replaceAll('{{projectId}}', token.token.project.id)
		.replaceAll('{{kind}}', metadata.kind);
	return url;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = Api;
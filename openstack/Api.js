var method = Api.prototype;

const httpClient = require('http/v3/client');
const API_PATTERN = '{{host}}/{{version}}/{{projectId}}/{{kind}}';

function Api(token, metadata) {
	this.token = token;
	this.metadata = metadata;
}

method.getApi = function() {
	let url = API_PATTERN
		.replace('{{host}}', this.metadata.host)
		.replace('{{version}}', this.metadata.version)
		.replace('{{projectId}}', '91704e43a4ca464e90724564ac97f078')
		.replace('{{kind}}', this.metadata.kind);
	return url;	
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
	let api = this.getApi();
	console.warn(api);
	let options = this.getOptions();
	let response = httpClient.get(api, options);
	return response;
};

method.get = function(id) {
	// TODO Validate the Id?
	let api = this.getApi() + '/' + id;
	let options = this.getOptions();
	let response = httpClient.get(api, options);
	return response;
};

method.create = function(entity) {
	// TODO Validate the Entity?
	let api = this.getApi();
	let options = this.getOptions();
	options.data = entity;
	options.contentType = 'application/json';
	let response = httpClient.post(api, options);
	return response;
};

method.update = function(id, entity) {
	// TODO Validate the Id and the Entity?
	let api = this.getApi() + '/' + id;
	let options = this.getOptions();
	options.data = entity;
	options.contentType = 'application/json';
	let response = httpClient.put(api, options);
	return response;
};

method.delete = function(id) {
	// TODO Validate the Id?
	let api = this.getApi() + '/' + id;
	let options = this.getOptions();
	let response = httpClient.delete(api, options);
	return response;
};

module.exports = Api;
const EXT_POINT_NAME = 'openstack-ServiceRegistryProvider';

var extensions = require('core/v3/extensions');

exports.getIdentityService = function() {
	let service = null;
	let extension = require(getExtension());
	if (typeof extension.getIdentityService === 'function') {
		service = extension.getIdentityService();
	}
	return service;
};

exports.getComputeService = function() {
	let service = null;
	let extension = require(getExtension());
	if (typeof extension.getComputeService === 'function') {
		service = extension.getComputeService();
	}
	return service;
};

exports.getVolumeService = function() {
	let service = null;
	let extension = require(getExtension());
	if (typeof extension.getVolumeService === 'function') {
		service = extension.getVolumeService();
	}
	return service;
};

exports.getNetworkService = function() {
	let service = null;
	let extension = require(getExtension());
	if (typeof extension.getNetworkService === 'function') {
		service = extension.getNetworkService();
	}
	return service;
};

function getExtension () {
	return extensions.getExtensions(EXT_POINT_NAME)[0];
}

/* globals $ */
/* eslint-env node, dirigible */

const EXT_POINT_NAME = '/openstack/serviceEndpointsProvider';

var extensionService = require('core/extensions');

exports.getIdentityService = function() {
	var service = null;
    var extension = require(getExtension());
    if (typeof extension.getIdentityService === 'function') {
	    service = extension.getIdentityService();
	}
	return service;
};

exports.getComputeService = function() {
	var service = null;
    var extension = require(getExtension());
    if (typeof extension.getComputeService === 'function') {
	    service = extension.getComputeService();
	}
	return service;
};

exports.getVolumeService = function() {
	var service = null;
    var extension = require(getExtension());
    if (typeof extension.getVolumeService === 'function') {
	    service = extension.getVolumeService();
	}
	return service;
};

exports.getNetworkService = function() {
	var service = null;
    var extension = require(getExtension());
    if (typeof extension.getNetworkService === 'function') {
	    service = extension.getNetworkService();
	}
	return service;
};

function getExtension () {
	return extensionService.getExtensions(EXT_POINT_NAME)[0];
}

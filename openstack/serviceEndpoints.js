/* globals $ */
/* eslint-env node, dirigible */

var serviceEndpointsExtension = require('openstack/utils/serviceEndpointsProvider');

// The Keystone service endpoint
exports.getIdentityService = function() {
	return serviceEndpointsExtension.getIdentityService();
};


// The Nova service endpoint
exports.getComputeService = function() {
	return serviceEndpointsExtension.getComputeService();
};

// The Cinder service
exports.getVolumeService = function() {
	return serviceEndpointsExtension.getVolumeService();
};

// The Neutron service endpont
exports.getNetworkService = function() {
	return serviceEndpointsExtension.getNetworkService();
};

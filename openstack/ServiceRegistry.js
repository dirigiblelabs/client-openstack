var ServiceRegistryProvider = require('openstack/extensions/ServiceRegistryProvider');

// The Keystone service endpoint
exports.getIdentityService = function() {
	return ServiceRegistryProvider.getIdentityService();
};


// The Nova service endpoint
exports.getComputeService = function() {
	return ServiceRegistryProvider.getComputeService();
};

// The Cinder service
exports.getVolumeService = function() {
	return ServiceRegistryProvider.getVolumeService();
};

// The Neutron service endpont
exports.getNetworkService = function() {
	return ServiceRegistryProvider.getNetworkService();
};

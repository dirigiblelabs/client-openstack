# OpenStack API client for Eclipse Dirigible

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/openstack_api.svg)](https://github.com/dirigiblelabs/openstack_api/graphs/contributors)

## Overview

Usage:

```javascript
var response = require('http/v3/response');
var Auth = require('openstack/identity/Auth');
var Servers = require('openstack/compute/Servers');

var domain = '<Domain-Name>';
var user = '<User-Name>';
var password = '<Password>';
var projectId = '<Project-Id>';

var auth = new Auth();
var token = auth.authenticate(domain, user, password, projectId);

var serversApi = new Servers(token);
var servers = serversApi.list();
response.println(JSON.stringify(servers));
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.

const { client } = require('@hey-api/client-fetch');
console.log('Config initially:', client.getConfig());
client.getConfig().baseUrl = 'http://test-url';
console.log('Config after mutation:', client.getConfig());

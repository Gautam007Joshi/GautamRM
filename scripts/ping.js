// scripts/ping.js
const { pingGoogle } = require('../lib/pingGoogle');

pingGoogle()
  .then(() => console.log('🚀 Ping test done.'))
  .catch((err) => console.error('❌ Ping failed:', err.message));

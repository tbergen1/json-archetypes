var test = require('tape');
var jjv = require('jjv');
var product_archetype_schema = require('./archetypes/product/product_archetype_schema');
var DataArchetypes = require('./index');
var DATs = new DataArchetypes();

var env = jjv();

// Register DataArchetypes With jjv
env.addSchema('product', product_archetype_schema);

var errors = env.validate('product', {title: 'product', price: '084', seller: 'Store'});

console.log(errors)


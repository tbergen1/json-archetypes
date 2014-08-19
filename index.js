/**
 *  JSON Archetypes – JSON standards for common types of data
 */


/**
 * Add Archetypes
 */
var archetypes = {};

archetypes.product = require('./archetypes/product/product_archetype_schema');
archetypes.receipt = require('./archetypes/receipt/receipt_archetype_schema');
archetypes.image = require('./archetypes/image/image_archetype_schema');
archetypes.task = require('./archetypes/task/task_archetype_schema');

module.exports.archetypes = archetypes;

/**
 * Instantiator
 */

module.exports.new = function(name) {
	var name = name.toLowerCase();
	if (typeof name !== 'string') throw new Error('Servant SDK Error - The new() method only accept a string for a name parameter');
	if (archetypes[name] === 'undefined') throw new Error('Servant SDK Error - You have entered a JSON Archetype that does not exist: ' + name);
	var instance = {};
	for (property in archetypes[name].properties) {
		instance[property] = archetypes[name].properties[property].default;
	}
	return instance;
};

/**
 * Add Validators
 */

module.exports.validateProduct = require('./archetypes/product/product_archetype_validation');
module.exports.validateTask = require('./archetypes/task/task_archetype_validation');
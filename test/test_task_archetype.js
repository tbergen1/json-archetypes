module.exports.run = function(callback) {

	/**
	 * Test Task Archetype
	 */
	var ZSchema = require("z-schema");
	var validator = new ZSchema();
	var test = require('tape');
	var JATs = require('../index');


	test('****** Test Task Archetype Schema', function(t) {
		validator.validateSchema(JATs.archetypes.task, function(err, report) {
			t.equal(report.valid, true, 'Schema is valid per JSON Schema v4');
			t.end();
		});
	});

	test('****** Test Task Archetype Validator - Empty Object', function(t) {

		var instance = {};

		JATs.validateTask(instance, function(errors, task) {
			t.equal(typeof errors.schema !== 'undefined', true);
			t.end();
		});
	});

	test('****** Test Task Archetype Validator - Missing Required Properties', function(t) {

		var instance = {
			category: 'yada yada'
		};

		JATs.validateTask(instance, function(errors, task) {
			t.equal(typeof errors.task !== 'undefined', true);
			t.equal(typeof errors.status !== 'undefined', true);
			t.end();
		});
	});

	test('****** Test Task Archetype Validator - Due Date Format Incorrect', function(t) {

		var instance = {
			due_date: 'yada yada'
		};

		JATs.validateTask(instance, function(errors, task) {
			t.equal(typeof errors.task !== 'undefined', true);
			t.equal(typeof errors.status !== 'undefined', true);
			t.equal(typeof errors.due_date !== 'undefined', true);
			t.end();
		});
	});

	test('****** Test Task Archetype Validator - Assignees Error', function(t) {

		var instance = {
			assignees: [28214]
		};

		JATs.validateTask(instance, function(errors, task) {
			t.equal(typeof errors.task !== 'undefined', true);
			t.equal(typeof errors.status !== 'undefined', true);
			t.equal(typeof errors.assignees !== 'undefined', true);
			t.end();
		});
	});

	// Test Callback
	callback();

}
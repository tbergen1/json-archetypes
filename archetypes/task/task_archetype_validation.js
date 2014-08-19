/**
 * Clean, comprehensible validator for the Task Archetype
 */

var Utils = require('../../utils');
var TaskArchetypeSchema = require('./task_archetype_schema');

module.exports = function(task, callback) {

    // Defaults
    var errors = {};

    /**
     * Check if instance is empty object
     */
    var keys = Object.keys(task);
    if (keys.length === 0) {
        errors.schema = 'Task Instance is empty';
        return callback(errors, null);
    }

    /**
     * task
     */
    if (Utils.whatIs(task.task) === 'undefined') {
        errors.task = 'Task is required';
    } else if (!Utils.isString(task.task)) {
        errors.task = 'Task must be a string';
    } else if (task.task.length > 140) {
        errors.task = 'Task cannot be longer than 140 characters';
    } else {
        // Sanitize
        task.task = task.task.toString().replace(/\s{2,}/g, ' ');
    }

    /**
     * status
     */
    if (Utils.whatIs(task.status) !== 'undefined') {
        if (TaskArchetypeSchema.properties.status.enum.indexOf(task.status) < 0) {
            errors.status = 'Status must be one of the allowed strings';
        }
    } else {
        errors.status = 'Status is required';
    }

    /**
     * list
     */
    if (Utils.whatIs(task.list) !== 'undefined') {
        if (Utils.whatIs(task.list) === 'undefined') {
            errors.list = 'List is required';
        } else if (!Utils.isString(task.list)) {
            errors.list = 'List must be a string';
        } else if (task.list.length > 300) {
            errors.list = 'List cannot be longer than 300 characters';
        } else {
            // Sanitize
            task.list = task.list.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * parent task
     */
    if (Utils.whatIs(task.parent_task) !== 'undefined') {
        if (!Utils.isString(task.parent_task)) {
            errors.parent_task = 'Parent task must be a string';
        } else if (task.parent_task.length > 100) {
            errors.parent_task = 'Parent task cannot be longer than 100 characters';
        } else {
            // Sanitize
            task.parent_task = task.parent_task.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * category
     */
    if (Utils.whatIs(task.category) !== 'undefined') {
        if (!Utils.isString(task.category)) {
            errors.category = "Category must be a string";
        } else if (task.category.length > 50) {
            errors.category = 'Category cannot be longer than 50 characters';
        } else {
            // Sanitize
            task.category = task.category.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * due_date
     */
    if (Utils.whatIs(task.due_date) !== 'undefined') {
        if (!Utils.isDateTime(task.due_date)) {
            errors.due_date = "Due date is not a valid ISO 8601 formatted string";
        } else {
            // Sanitize
            task.due_date = task.due_date.toString().replace(/\s{2,}/g, ' ');
        }
    }

    /**
     * priority_level
     */
    if (Utils.whatIs(task.priority_level) !== 'undefined') {
        if (!Utils.isInteger(task.priority_level)) {
            errors.priority_level = 'Priority level must be an integer';
        } else if (!Utils.isPositiveInteger(task.priority_level)) {
            errors.priority_level = 'Priority level must be a positive integer';
        } else if (task.priority_level < 1 || task.priority_level > 5 ) {
            errors.priority_level = 'Priority level must be 1 through 5';
        }
    }

    /**
     * percentage_completed
     */
    if (Utils.whatIs(task.percentage_completed) !== 'undefined') {
        if (!Utils.isInteger(task.percentage_completed)) {
            errors.percentage_completed = 'Percentage completed must be an integer';
        } else if (!Utils.isPositiveInteger(task.percentage_completed)) {
            errors.percentage_completed = 'Percentage completed must be a positive integer';
        } else if (task.percentage_completed < 0 || task.percentage_completed > 100 ) {
            errors.percentage_completed = 'Percentage completed must be 0 through 100';
        }
    }

    /**
     * assignees
     */
    if (Utils.whatIs(task.assignees) !== 'undefined') {
        if (!Utils.isArray(task.assignees)) {
            errors.assignees = 'Assignees must be an array';
        } else if (task.assignees.length > 30) {
            errors.assignees = 'Only 30 assignees are allowed';
        } else if (task.assignees.length && task.assignees.length <= 30) {
            var i = 0;
            while (i < task.assignees.length && !errors.assignees) {
                if (!Utils.isString(task.assignees[i])) {
                    errors.assignees = 'Assignees must be strings';
                }
                i++;
            }
            // Sanitize - Strip out duplicates
            task.assignees = Utils.uniq(task.assignees);
        }
    }


    /**
     * Callback
     */
    if (Object.keys(errors).length === 0) {
        return callback(null, task);
    } else {
        return callback(errors, null);
    }

}; // validate
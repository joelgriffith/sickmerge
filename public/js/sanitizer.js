var _ = require('lodash');

export default {
	parseParams: function (parameters, validators) {
		_.each(Object.keys(parameters), function (param) {
			if (typeof parameters[param] !== validators[param] && validators[param] !== undefined) {
				throw new Error('Expected ' + parameters[param] + ' to be typeof ' + validators[param]);
			}
		});
	}
};
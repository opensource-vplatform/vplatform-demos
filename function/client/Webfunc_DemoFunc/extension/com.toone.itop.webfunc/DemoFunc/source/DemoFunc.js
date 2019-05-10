/**
 *
 *
 */
define('./DemoFunc', function (require, exports, module) {
	var sandbox;
	var math;

	exports.initModule = function(sb) {
		sandbox = sb;
		math = sandbox.getService("vjs.framework.extension.util.Math");
	}

	var main = function(param) {
		var args = param.getArgs();
		if (args && args.length > 0) {
			var result = 0;
			for (var i = 0, argLength = args.length; i < argLength; i++) {
				var tmpArg = args[i];
				if (undefined === tmpArg || null === tmpArg || tmpArg === "")
					//return NaN;
					tmpArg=0;
				else {
					try {
						result = Number(math.add(result, tmpArg));
					} catch (e) {
						return NaN;
					}
				}
			}

			return result;
		} else
			return NaN;
	};

	exports.main = main;
});

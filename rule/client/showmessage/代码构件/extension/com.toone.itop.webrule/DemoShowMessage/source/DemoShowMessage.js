/**
 *
 *
 */
define('./DemoShowMessage', function (require, exports, module) {
	var jsonUtil;

	exports.initModule = function(){
		jsonUtil = sb.getService("vjs.framework.extension.util.JsonUtil");
	}
		//���������(������)
		var main = function (ruleContext) {
			var inParams = ruleContext.getRuleCfg()["inParams"];
			var inParamsObj = jsonUtil.json2obj(inParams);
			var demoEntiry = inParamsObj["ruleData"];
			if(demoEntiry){
				var record = demoEntiry["datas"] && demoEntiry["datas"]["values"]
				&&demoEntiry["datas"]["values"][0];
				var message = record && record["message"];
				if(message != undefined || message != null){
					alert(message);
				}
			}
		};
		//ע���������ڷ���(������)
		exports.main = main;
	});

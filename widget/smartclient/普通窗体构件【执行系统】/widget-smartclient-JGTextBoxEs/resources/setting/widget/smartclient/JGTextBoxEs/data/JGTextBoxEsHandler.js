/**
 * 控件数据同步类
 */
define("./JGTextBoxEsHandler", function(require, exports, module) {
	var sandbox;
	var CurrentRecordObserver;
	var dataBindingUtil;
	var observerManager;
	var vmMappingManager;

	exports.initModule = function(sb) {
		sandbox = sb;
		CurrentRecordObserver = sb.getService("vjs.framework.extension.platform.interface.observer.CurrentRecordObserver");
		observerManager = sb.getService("vjs.framework.extension.platform.services.observer.manager.DatasourceObserverManager");
		dataBindingUtil = sandbox.getService("vjs.framework.extension.ui.plugin.JGComponent.data.DataBindingUtil", {
			"type" : "smartclient"
		});
		vmMappingManager = sandbox.getService("vjs.framework.extension.platform.services.vmmapping.manager.WindowVMMappingManager");
	};
	
	/**
	 * 前台DB数据同步响应方法。
	 * 
	 * 前台DB数据变化后自动触发，一般在这里对UI进行更新操作。
	 */
	exports.init = function(widgetCode) {
		var entityCode = vmMappingManager.getDatasourceNamesByWidgetCode({
			"widgetCode" : widgetCode
		});
		var observer = new CurrentRecordObserver(entityCode,widgetCode);
		observer.setAsync(false);
		observer.clearWidgetValueHandler(function(){
			dataBindingUtil.clearWidgetValue(widgetCode);
		})
		observer.setWidgetValueHandler(function(record){
			dataBindingUtil.setWidgetValue(widgetCode,record);
		})
		observerManager.addObserver({
			"observer": observer
		});
	};
	
});
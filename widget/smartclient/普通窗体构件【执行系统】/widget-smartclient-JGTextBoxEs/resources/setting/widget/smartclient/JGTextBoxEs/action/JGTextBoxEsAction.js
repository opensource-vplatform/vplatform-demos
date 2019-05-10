/**
 * 控件对外接口实现类
 */
define("./JGTextBoxEsAction", function(require, exports, module) {
	
	var sandbox;
	var keydown;
	var widgetContext;
	var eventManager;
	var widgetDatasourcezy;
	var vmmappingManager;
	var datasourceUtil;

	exports.initModule = function(sb) {
		sandbox = sb;
		//键盘相关api，会返回键盘的key值
		keydown = sandbox.getService("vjs.framework.extension.platform.services.view.widget.common.logic.eventhandler.KeyDownHandler");
		//控件上下文
		widgetContext = sandbox.getService("vjs.framework.extension.platform.services.view.widget.common.context.WidgetContext");
		//普通的事件
		eventManager = sb.getService("vjs.framework.extension.platform.services.view.event.EventManager");
		widgetDatasource = sandbox.getService("vjs.framework.extension.platform.services.view.widget.common.logic.datasource.WidgetDatasource");
		vmmappingManager = sandbox.getService("vjs.framework.extension.platform.services.vmmapping.manager.WindowVMMappingManager");
		datasourceUtil = sandbox.getService("vjs.framework.extension.platform.services.view.logic.datasource.DatasourceUtil");
	};
	
	/**
	 * 初始化控件事件。
	 * 
	 * 渲染完成后触发，一般在这里进行ui的事件监听和事件绑定。
	 */
	var initEvent = function(widgetCode) {
		var datasourceName = widgetDatasource.getBindDatasourceName(widgetCode);
		var datasourceField = vmmappingManager.getFieldCodeByPropertyCode({
			widgetCode : widgetCode,
			propertyCode : "columnName"
		});
		datasourceUtil.addDatasourceLoadEventHandler(datasourceName, eventManager.fireEvent(widgetCode, "OnValueLoaded"));
		datasourceUtil.addDatasourceFieldUpdateEventHandler(datasourceName, datasourceField, eventManager.fireEvent(widgetCode, "OnValueChanged"));
		
		//事件绑定，isc的textbox的focus => 开发系统绑定的OnEnter规则 
		var widget = widgetContext.get(widgetCode, "widgetObj");
		widget.on("keydown",keydown.handleKeyDown(widgetCode,"OnKeyDown"));
		widget.on("titleClick",eventManager.fireEvent(widgetCode,"OnLabelClick"));
		widget.on("focus",eventManager.fireEvent(widgetCode,"OnEnter"));
		widget.on("blur",eventManager.fireEvent(widgetCode,"OnLeave"));
	};

	exports.initEvent = initEvent;
	
	var getValue = function(widgetId) {
		var value = widgetDatasource.getSingleValue(widgetId);
		if (undefined == value || null == value) {
			return "";
		}
		return value;
	}

	var setValue = function(widgetId, value) {
		widgetDatasource.setSingleValue(widgetId, value);
	}

	var getDefaultValue = function(widgetId) {
		return widgetDatasource.getSingleColumnWidgetDefaultValue(widgetId);
	}

	var setReadOnly = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setReadOnly(state);
	}

	var getReadOnly = function(widgetId) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		return widget.isReadOnly();
	}

	var setEnabled = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setEnabled(state);
	}

	var getEnabled = function(widgetId) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		return !widget.isDisabled();
	}

	var setVisible = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setVisible(state);
	}

	var getVisible = function(widgetId) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		return widget.isVisible();
	}

	var setSimpleChineseTitle = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setSimpleChineseTitle(state);
	}

	var setLabelBackColor = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setLabelBackColor(state);
	}

	var setLabelForeColor = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setLabelForeColor(state);
	}

	var setLabelFontStyle = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setLabelFontStyle(state);
	}

	var setValueBackColor = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setValueBackColor(state);
	}

	var setValueForeColor = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setValueForeColor(state);
	}

	var setValueFontStyle = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setValueFontStyle(state);
	}

	var getSimpleChineseTitle = function(widgetId, state) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		return widget.getSimpleChineseTitle();
	}

	var cleanSelectedControlValue = function(widgetId, onlyCleanSelectedRecord) {
		widgetDatasource.clearValue(widgetId, onlyCleanSelectedRecord);
	}

	var setLabelText = function(widgetId, title) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setSimpleChineseTitle(title);
	}

	var getLabelText = function(widgetId) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		return widget.getSimpleChineseTitle();
	}

	var setFocus = function(widgetId) {
		var widget = widgetContext.get(widgetId, "widgetObj");
		widget.setControlFocus();
	}

	exports.setFocus = setFocus;
	exports.setLabelText = setLabelText;
	exports.getLabelText = getLabelText;
	exports.cleanSelectedControlValue = cleanSelectedControlValue;
	exports.setLabelBackColor = setLabelBackColor;
	exports.setLabelForeColor = setLabelForeColor;
	exports.setLabelFontStyle = setLabelFontStyle;
	exports.setValueBackColor = setValueBackColor;
	exports.setValueForeColor = setValueForeColor;
	exports.setValueFontStyle = setValueFontStyle;
	exports.setReadOnly = setReadOnly;
	exports.setEnabled = setEnabled;
	exports.setVisible = setVisible;
	exports.getReadOnly = getReadOnly;
	exports.getEnabled = getEnabled;
	exports.getVisible = getVisible;
	exports.getSimpleChineseTitle = getSimpleChineseTitle;
	exports.setValue = setValue;
	exports.getValue = getValue;
	exports.getDefaultValue = getDefaultValue;
});
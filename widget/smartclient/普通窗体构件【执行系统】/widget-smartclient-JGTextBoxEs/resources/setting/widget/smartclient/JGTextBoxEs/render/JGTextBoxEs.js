/**
 * 控件渲染器
 */
define("./JGTextBoxEs", function (require, exports, module) {
	var sandbox;
	var widgetContext;
	exports.initModule = function (sb) {
		
		//模块初始化
		sandbox = sb;
		widgetContext = sandbox.getService("vjs.framework.extension.platform.services.view.widget.common.context.WidgetContext");
		
		initUI();
		
	};
	
	/**
	 * UI定义（此方法只运行一次）
	 * 
	 * 在这里可以基于第三方UI进行定制
	 */
	var initUI = function(){
		
		
		
//		isc.ClassFactory.defineClass("JGTextBoxEs", "JGBaseWidget");
		isc.ClassFactory.defineClass("JGTextBoxEs", "JGFormItemView");
		isc.ClassFactory.mixInInterface("JGTextBoxEs", "JGFormWidget");
		isc.JGTextBoxEs.addProperties({
			WidgetStyle : "JGTextBoxEs",
			LabelText : '文本',
			//标题宽度
		    TitleWidth: 76,
		    //绑定字段名称
		    ColumnName: 'columnName',
			listener:['keydown','focus','titleClick','blur']
		});

		isc.JGTextBoxEs.addMethods({
			//自定义控件可覆盖父类的这个方法，扩展本控件的初始实例化逻辑，相当于控件的构造函数
			_initWidget : function () {
				/*
				 * 演示代码
		        this._button = isc.Button.create({
		            id: this.id,
		            title: this.LabelText,
		            width: this.Width,
		            height: this.Height,
					//防止事件执行过久而导致用户继续触发,功能与_referEvent相同
					click : this._referEvent(this,'click'),//按钮事件触发同样触发父亲的事件
					baseStyle :this.WidgetStyle
		        });
				
				// 必须添加到本控件的内部SC画布中，否则无法支持SC的父子控件层次关系
				this.addChild(this._button);
				*/
			},
			_initProperties: function() {
		        if (this.WidgetStyle == "JGTextBoxEs") {
		            this.WidgetStyle = "JGForm"
		        }

		        this.initFormProperties();
		        var items = [];
		        //配置标题部分
		        var isShowTitle = this.isShowTitle(this.TitleVisible, this.TitleWidth);
		        this.isShowTitle = isShowTitle;
		        if (isShowTitle) {
		            items[items.length] = this.getTitleProperties()
		        }

		        //配置文本框部分
		        items[items.length] = isc.addProperties(this.getTextProperties(), {
		            type: "v3Text",
		            maskSaveLiterals: true,
		            getOuterTableCSS: function() {
		                // 解决 css 中的宽度值不对情况，缺少单位 px 定义
		                var _style = this.invokeSuper(null, "getOuterTableCSS");
		                var width = this.getInnerWidth();
		                var newWidth = width - 8; // border:1px; padding:3px;

		                // 添加 display:block; 用于解决IE和谷歌样式兼容问题
		                return _style.toLowerCase().replace("width:" + width + ";", "width:" + newWidth + "px; display:block; border-collapse: separate;");
		            }
		        });
		        this.items = items;
		    },

		    /*
		     **验证提示信息
		     */
		    showError: function() {
		        if (arguments.length > 1) {
		            var msg = arguments[1].getError(); //判断是否有错误信息
		            if (msg) {
		                var eErrorCanvas = arguments[1].eErrorCanvas;
		                var _left = arguments[0].TitleWidth + arguments[0].getPageLeft();
		                var _top = this.getPageTop() + arguments[0].height + 10;
		                if (this.getPageTop() > 38 || document.documentElement.clientHeight < _top) {
		                    _top = this.getPageTop() - 38;
		                }

		                var _pe = this.getParentElements();
		                var _parentPe = _pe[_pe.length - 1];

		                _top = _top - _parentPe.getPageTop()
		                _left = _left - _parentPe.getPageLeft()
		                if (_top < 0) {
		                    _top = 38;
		                }

		                if (!eErrorCanvas) {
		                    eErrorCanvas = arguments[1].eErrorCanvas = isc.Canvas.create({
		                        width: 110,
		                        height: 28,
		                        left: _left,
		                        top: _top
		                    })
		                    var _nTop = this.getPageTop() - 38;
		                    if (_top == _nTop || _top == _nTop - _parentPe.getPageTop()) {
		                        eErrorCanvas.contents = '<div class="tips"><div class="ico-tips-top"></div><span class="iconfont icon-warn JGFormErrorIcon"></span>此项为必填项</div>';
		                    } else {
		                        eErrorCanvas.contents = '<div class="tips"><div class="ico-tips-bottom"></div><span class="iconfont icon-warn JGFormErrorIcon"></span>此项为必填项</div>';
		                    }
		                    var _pe = this.getParentElements();
		                    _pe[_pe.length - 1].addChild(eErrorCanvas);

		                    arguments[1].eErrorCanvas.tmrID = isc.Timer.setTimeout(function() {
		                        eErrorCanvas.moveTo(-100, -100)
		                    }, 3000); //设置时间监听器
		                    eErrorCanvas.bringToFront();
		                    eErrorCanvas.show();
		                } else {
		                    //删除时间监听器
		                    if (eErrorCanvas.tmrID) {
		                        eErrorCanvas.tmrID = isc.Timer.clear(eErrorCanvas.tmrID);
		                        eErrorCanvas.tmrID = null;
		                    }
		                    eErrorCanvas.moveTo(_left, _top);
		                }
		            }
		        }
		    },
		});
	}
	
	
	/**
	 * 控件UI初始化，产生UI实例
	 */
	var init = function (properties) {
		properties.TitleWidth = properties.LabelWidth;
		properties.TitleVisible = properties.LabelVisible;
		properties.SimpleChineseTitle = properties.LabelText;
		var widgetId = properties.widgetId;
		var widget = isc.JGTextBoxEs.create(properties);
		widgetContext.put(widgetId, "widgetObj", widget);
		var scopeId = properties.scopeId;
		widgetContext.put(widgetId, "scopeId", scopeId);
	};
	
	/**
	 * 在这里实现操作UI的其他方法
	 */
	 
	exports.init = init;
});

define('./moblieCalendar', function(require, exports, module) {
	var sandbox;
	var math;

	exports.initModule = function(sb) {
		sandbox = sb;
	}

	var main = function(param) {
		var args = param.getArgs();
		var value = args[0];
		//判断插件是否已注册
		if(window.plugins.calendar){
		   var startDate = new Date(2018,3,15,18,30,0,0,0); // beware: month 0 = january, 11 = december
	       var endDate = new Date(2018,3,18,19,30,0,0,0);
	       var title = "V3平台技术分享";
	       var eventLocation = "公司";
	       var notes = "分享V3平台最新技术，分享最前沿研发方案！";
	       var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	       var error = function(message) { alert("Error: " + message); };

	       // create an event silently (on Android < 4 an interactive dialog is shown which doesn't use this options) with options:
	       var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
	       calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
	       calOptions.secondReminderMinutes = 5;

	       // Added these options in version 4.2.4:
	       calOptions.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly
	       calOptions.recurrenceEndDate = new Date(2016,10,1,0,0,0,0,0); // leave null to add events into infinity and beyond
	       calOptions.calendarName = "Birthdays"; // iOS only
	       calOptions.calendarId = 1; // Android only, use id obtained from listCalendars() call which is described below. This will be ignored on iOS in favor of calendarName and vice versa. Default: 1.

	       // This is new since 4.2.7:
	       calOptions.recurrenceInterval = 2; // once every 2 months in this case, default: 1

	       // And the URL can be passed since 4.3.2 (will be appended to the notes on Android as there doesn't seem to be a sep field)
	       calOptions.url = "https://www.google.com";

	      
	       if(value=="createEvent"){
	    	 //调用原生端行程设置行程
	    	  window.plugins.calendar.createEventInteractivelyWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);
	       }else{
	    	 //调用原生端日历
	    	  window.plugins.calendar.openCalendar();
	       }
		}else{
			return;
		}
	};

	exports.main = main;
});
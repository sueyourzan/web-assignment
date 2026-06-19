Date.prototype.format = function (format) {
           var args = {
               "M+": this.getMonth() + 1,
               "d+": this.getDate(),
               "h+": this.getHours(),
               "m+": this.getMinutes(),
               "s+": this.getSeconds(),
               "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
               "S": this.getMilliseconds()
           };
           if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
               var n = args[i];
               if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
           }
           return format;
       };
	   
function getWeek(date){
	var week=date.getDay();
	switch(week){
		case 0:return "星期日";
		case 1:return "星期一";
		case 2:return "星期二";
		case 3:return "星期三";
		case 4:return "星期四";
		case 5:return "星期五";
		case 6:return "星期六";
	}
}
var mobile=false;
var device=navigator.userAgent;
if((device.indexOf("iPhone")>0)||(device.indexOf("Android")>0))
    mobile=true;

function updateTime() {
    var now = new Date();
    var timeString = now.format("hh:mm:ss");
    var dataString = now.format("yyyy-MM-dd") + " " ;
    var timeDom = document.getElementById("current-time");
    if(timeDom){
        timeDom.innerHTML = mobile ? timeString : dataString + " " + timeString;
    }
}
document.addEventListener("DOMContentLoaded", function() {
    updateTime();
    setInterval(updateTime, 1000);
});
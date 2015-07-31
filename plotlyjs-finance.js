!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.PlotlyFinance=e()}}(function(){return function e(t,n,o){function r(l,a){if(!n[l]){if(!t[l]){var c="function"==typeof require&&require;if(!a&&c)return c(l,!0);if(i)return i(l,!0);var s=new Error("Cannot find module '"+l+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[l]={exports:{}};t[l][0].call(f.exports,function(e){var n=t[l][1][e];return r(n?n:e)},f,f.exports,e,t,n,o)}return n[l].exports}for(var i="function"==typeof require&&require,l=0;l<o.length;l++)r(o[l]);return r}({1:[function(e,t,n){n.ohlc=e("./src/ohlc"),n.candlestick=e("./src/candlestick")},{"./src/candlestick":8,"./src/ohlc":10}],2:[function(e,t,n){var o=t.exports={};o.DEFAULT_INCREASING_COLOR="#3D9970",o.DEFAULT_DECREASING_COLOR="#FF4136",o.TRANSPARENT="rgba(0,0,0,0)"},{}],3:[function(e,t,n){"use strict";t.exports=function(e,t){function n(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]}var o={};return"object"==typeof e&&n(e),"object"==typeof t&&n(t),o}},{}],4:[function(e,t,n){"use strict";t.exports=function(e){return[].concat.apply([],e)}},{}],5:[function(e,t,n){"use strict";t.exports=function(e,t,n){var o,r,i,l=1/0;for(Object.keys(e).forEach(function(t){var n=e[t];Array.isArray(n)&&n.length<l&&(l=n.length)}),o=0;o<t.length;o++){if(r=t[o],i=e[r],void 0===i)return!1;i.length>l&&(e[r]=i.slice(0,l))}if(void 0!==n)for(o=0;o<n.length;o++)r=n[o],i=e[r],void 0===i?e[r]=new Array(l):i.length>l&&(e[r]=i.slice(0,l));return e}},{}],6:[function(e,t,n){"use strict";t.exports=function(e,t){if(void 0===t.dflt)return e;var n=[t.dflt];return void 0!==t.values?(n=n.concat(t.values),-1===n.indexOf(e)&&(e=t.dflt)):e=void 0===e?t.dflt:e,e}},{}],7:[function(e,t,n){"use strict";function o(e){this.open=e.open,this.high=e.high,this.low=e.low,this.close=e.close,this.len=this.open.length,this.x=e.dates[0]instanceof Date?e.dates.map(function(e){return e.getTime()}):this.open.map(function(e,t){return t})}t.exports=o;var r=o.prototype;r.getIncrData=function(){for(var e=this,t=["Low","Open","Close","High",""],n=[],o=[],r=[],i=[],l=[],a=[],c=0;c<e.len;c++)e.close[c]>e.open[c]&&(n.push(e.x[c]),o.push(e.open[c]),r.push(e.close[c]-e.open[c]),i=i.concat([e.x[c],e.x[c],e.x[c],e.x[c],null]),l=l.concat([e.low[c],e.open[c],e.close[c],e.high[c],null]),a=a.concat(t));return{x:n,open:o,diff:r,xStick:i,yStick:l,text:a}},r.getDecrData=function(){for(var e=this,t=["Low","Close","Open","High",""],n=[],o=[],r=[],i=[],l=[],a=[],c=0;c<e.len;c++)e.close[c]<=e.open[c]&&(n.push(e.x[c]),o.push(e.close[c]),r.push(e.open[c]-e.close[c]),i=i.concat([e.x[c],e.x[c],e.x[c],e.x[c],null]),l=l.concat([e.low[c],e.close[c],e.open[c],e.high[c],null]),a=a.concat(t));return{x:n,close:o,diff:r,xStick:i,yStick:l,text:a}}},{}],8:[function(e,t,n){"use strict";function o(e,t){var n=e.getIncrData(),o="Increasing";return[{type:"bar",x:n.x,y:n.open,marker:{color:s.TRANSPARENT},legendgroup:o,showlegend:!1,hoverinfo:"none"},c({type:"bar",x:n.x,y:n.diff,legendgroup:o,marker:a(t.marker,{dflt:{color:s.DEFAULT_INCREASING_COLOR}}),showlegend:!1,hoverinfo:"none"},t),c({type:"scatter",mode:"lines",x:n.xStick,y:n.yStick,text:a(t.text,{dflt:n.text}),name:a(t.name,{dflt:o}),legendgroup:o,line:a(t.line,{dflt:{color:s.DEFAULT_INCREASING_COLOR}}),showlegend:void 0!==t.name},t)]}function r(e,t){var n=e.getDecrData(),o="Decreasing";return[{type:"bar",x:n.x,y:n.close,marker:{color:s.TRANSPARENT},legendgroup:o,showlegend:!1,hoverinfo:"none"},c({type:"bar",x:n.x,y:n.diff,legendgroup:o,marker:a(t.marker,{dflt:{color:s.DEFAULT_DECREASING_COLOR}}),showlegend:!1,hoverinfo:"none"},t),c({type:"scatter",mode:"lines",x:n.xStick,y:n.yStick,text:a(t.text,{dflt:n.text}),name:a(t.name,{dflt:o}),legendgroup:o,line:a(t.line,{dflt:{color:s.DEFAULT_DECREASING_COLOR}}),showlegend:void 0!==t.name},t)]}function i(e){var t=Math.min(e.low),n=Math.max(e.high),o=n-t;return[t-.1*o,n+.1*o]}var l=e("../lib/set-arrays"),a=e("../lib/set-opt"),c=e("../lib/extend-flat"),s=e("../lib/consts"),f=e("./candlestick-factory"),u=e("./validate-data"),d=t.exports={};d.create=function(e,t){if(e=l(e,["open","high","low","close"],["dates"])){u(e),void 0===t&&(t={});var n=a(t.direction,{dflt:"both",values:["increasing","decreasing"]});delete t.direction;var c=new f(e),s=[];return-1!==["both","increasing"].indexOf(n)&&(s=s.concat(o(c,t))),-1!==["both","decreasing"].indexOf(n)&&(s=s.concat(r(c,t))),{data:s,layout:{barmode:"stack",bargroupgap:.2,yaxis:{range:i(e),fixedrange:!0}}}}}},{"../lib/consts":2,"../lib/extend-flat":3,"../lib/set-arrays":5,"../lib/set-opt":6,"./candlestick-factory":7,"./validate-data":11}],9:[function(e,t,n){"use strict";function o(e){this.open=e.open,this.high=e.high,this.low=e.low,this.close=e.close,this.dates=e.dates,this.len=this.open.length,this.textSignature=["Open","Open","High","Low","Close","Close",""],this.allX=[],this.allY=[],this.incrX=[],this.incrY=[],this.decrX=[],this.decrY=[],this.getAllXY(),this.seperateIncrDecr()}var r=e("../lib/flatten-2d-array");t.exports=o;var i=o.prototype;i.getAllXY=function(){var e,t,n=this,o=[];for(t=0;t<n.len;t++)n.allY.push([n.open[t],n.open[t],n.high[t],n.low[t],n.close[t],n.close[t],null]);if(n.dates[0]instanceof Date){for(t=0;t<n.len-1;t++)o.push(n.dates[t+1].getTime()-n.dates[t].getTime());e=Math.min.apply(null,o)/5,n.dates.forEach(function(t){t=t.getTime(),n.allX.push([t-e,t,t,t,t,t+e,null])})}else n.open.forEach(function(e,t){n.allX.push([t-.2,t,t,t,t,t+.2,null])})},i.seperateIncrDecr=function(){for(var e=this,t=0;t<e.len;t++)void 0!==e.close[t]&&(e.close[t]>e.open[t]?(e.incrX.push(e.allX[t]),e.incrY.push(e.allY[t])):(e.decrX.push(e.allX[t]),e.decrY.push(e.allY[t])))},i.getIncrData=function(){var e=this,t=[];return e.incrX.forEach(function(){t=t.concat(e.textSignature)}),{x:r(e.incrX),y:r(e.incrY),text:t}},i.getDecrData=function(){var e=this,t=[];return e.decrX.forEach(function(){t=t.concat(e.textSignature)}),{x:r(e.decrX),y:r(e.decrY),text:t}}},{"../lib/flatten-2d-array":4}],10:[function(e,t,n){"use strict";function o(e,t){var n=e.getIncrData();return a({type:"scatter",mode:"lines",x:n.x,y:n.y,text:l(t.text,{dflt:n.text}),name:l(t.name,{dflt:"Increasing"}),line:l(t.line,{dflt:{color:c.DEFAULT_INCREASING_COLOR,width:1}}),showlegend:void 0!==t.name},t)}function r(e,t){var n=e.getDecrData();return a({type:"scatter",mode:"lines",x:n.x,y:n.y,text:l(t.text,{dflt:n.text}),name:l(t.name,{dflt:"Decreasing"}),line:l(t.line,{dflt:{color:c.DEFAULT_DECREASING_COLOR,width:1}}),showlegend:l(t.showlegend,{dflt:!1,values:[!0,!1]})},t)}var i=e("../lib/set-arrays"),l=e("../lib/set-opt"),a=e("../lib/extend-flat"),c=e("../lib/consts"),s=e("./ohlc-factory"),f=e("./validate-data"),u=t.exports={};u.create=function(e,t){if(e=i(e,["open","high","low","close"],["dates"])){f(e),void 0===t&&(t={});var n=l(t.direction,{dflt:"both",values:["increasing","decreasing"]});delete t.direction;var a=new s(e),c=[];return-1!==["both","increasing"].indexOf(n)&&c.push(o(a,t)),-1!==["both","decreasing"].indexOf(n)&&c.push(r(a,t)),{data:c,layout:{xaxis:{zeroline:!1},hovermode:"closest"}}}}},{"../lib/consts":2,"../lib/extend-flat":3,"../lib/set-arrays":5,"../lib/set-opt":6,"./ohlc-factory":9,"./validate-data":11}],11:[function(e,t,n){"use strict";t.exports=function(e){[e.open,e.low,e.close].forEach(function(t){e.high.forEach(function(e,n){if(e<t[n])throw new Error(["Oops! Looks like some of your high values","are less than the corresponding open,","low, or close values."].join(" "))})}),[e.open,e.high,e.close].forEach(function(t){e.low.forEach(function(e,n){if(e>t[n])throw new Error(["Oops! Looks like some of your low values","are greather than the corresponding open,","high, or close values."].join(" "))})})}},{}]},{},[1])(1)});
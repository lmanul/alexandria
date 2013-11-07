// This file contains all the minified libraries and plugins that we are using
// concatenated into one file rather than serving them a separate, slower files.

// Listing of what is included (in order):

// 1. Underscore.js
// 2. Backbone.js
// 3. Lawnchair v0.6.1, with Chrome storage adapter.
// 4. Twitter Bootstrap.js
// 5. Jquery mousewheel
// 6. Pan and Zoom
// 7. Jath
// 8. URI.js
// 9. ZipFile.complete.js
// 10. crypto SHA1
// 11. HandlebarsRuntime.js

// Underscore.js 1.3.1
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function q(a,c,d){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return false;switch(e){case "[object String]":return a==String(c);case "[object Number]":return a!=+a?c!=+c:a==0?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var f=d.length;f--;)if(d[f]==a)return true;d.push(a);var f=0,g=true;if(e=="[object Array]"){if(f=a.length,g=f==c.length)for(;f--;)if(!(g=f in a==f in c&&q(a[f],c[f],d)))break}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return false;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&q(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,
h)&&!f--)break;g=!f}}d.pop();return g}var r=this,G=r._,n={},k=Array.prototype,o=Object.prototype,i=k.slice,H=k.unshift,l=o.toString,I=o.hasOwnProperty,w=k.forEach,x=k.map,y=k.reduce,z=k.reduceRight,A=k.filter,B=k.every,C=k.some,p=k.indexOf,D=k.lastIndexOf,o=Array.isArray,J=Object.keys,s=Function.prototype.bind,b=function(a){return new m(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=b;exports._=b}else r._=b;b.VERSION="1.3.1";var j=b.each=
b.forEach=function(a,c,d){if(a!=null)if(w&&a.forEach===w)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===n)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===n)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(x&&a.map===x)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==
null&&(a=[]);if(y&&a.reduce===y)return e&&(c=b.bind(c,e)),f?a.reduce(c,d):a.reduce(c);j(a,function(a,b,i){f?d=c.call(e,d,a,b,i):(d=a,f=true)});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(z&&a.reduceRight===z)return e&&(c=b.bind(c,e)),f?a.reduceRight(c,d):a.reduceRight(c);var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=
function(a,c,b){var e;E(a,function(a,g,h){if(c.call(b,a,g,h))return e=a,true});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(A&&a.filter===A)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(B&&a.every===B)return a.every(c,b);j(a,function(a,g,h){if(!(e=
e&&c.call(b,a,g,h)))return n});return e};var E=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(C&&a.some===C)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return n});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;return p&&a.indexOf===p?a.indexOf(c)!=-1:b=E(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});
return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){f==0?b[0]=a:(d=Math.floor(Math.random()*(f+1)),b[f]=b[d],b[d]=a)});return b};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,g){return{value:a,criteria:c.call(d,a,b,g)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,
c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:a.toArray?a.toArray():b.isArray(a)?i.call(a):b.isArguments(a)?i.call(a):b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=
b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,e=[];b.reduce(d,function(d,g,h){if(0==h||(c===true?b.last(d)!=g:!b.include(d,g)))d[d.length]=g,e[e.length]=a[h];return d},[]);
return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1));return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,
d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(p&&a.indexOf===p)return a.indexOf(c);for(d=0,e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(D&&a.lastIndexOf===D)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};
var F=function(){};b.bind=function(a,c){var d,e;if(a.bind===s&&s)return s.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));F.prototype=a.prototype;var b=new F,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,
c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i=b.debounce(function(){h=g=false},c);return function(){d=this;e=arguments;var b;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);i()},c));g?h=true:
a.apply(d,e);i();g=true}};b.debounce=function(a,b){var d;return function(){var e=this,f=arguments;clearTimeout(d);d=setTimeout(function(){d=null;a.apply(e,f)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};
b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=J||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.defaults=function(a){j(i.call(arguments,
1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return q(a,b,[])};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=o||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};
b.isArguments=function(a){return l.call(a)=="[object Arguments]"};if(!b.isArguments(arguments))b.isArguments=function(a){return!(!a||!b.has(a,"callee"))};b.isFunction=function(a){return l.call(a)=="[object Function]"};b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};
b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,b){return I.call(a,b)};b.noConflict=function(){r._=G;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.mixin=function(a){j(b.functions(a),
function(c){K(c,b[c]=a[c])})};var L=0;b.uniqueId=function(a){var b=L++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var t=/.^/,u=function(a){return a.replace(/\\\\/g,"\\").replace(/\\'/g,"'")};b.template=function(a,c){var d=b.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.escape||t,function(a,b){return"',_.escape("+
u(b)+"),'"}).replace(d.interpolate||t,function(a,b){return"',"+u(b)+",'"}).replace(d.evaluate||t,function(a,b){return"');"+u(b).replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",e=new Function("obj","_",d);return c?e(c,b):function(a){return e.call(this,a,b)}};b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var v=function(a,c){return c?b(a).chain():a},K=function(a,c){m.prototype[a]=
function(){var a=i.call(arguments);H.call(a,this._wrapped);return v(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return v(d,this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return v(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=
true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);
// Backbone.js 0.9.1
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var i=this,r=i.Backbone,s=Array.prototype.slice,t=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:i.Backbone={};g.VERSION="0.9.1";var f=i._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var h=i.jQuery||i.Zepto||i.ender;g.setDomLibrary=function(a){h=a};g.noConflict=function(){i.Backbone=r;return this};g.emulateHTTP=!1;g.emulateJSON=!1;g.Events={on:function(a,b,c){for(var d,a=a.split(/\s+/),e=this._callbacks||(this._callbacks={});d=a.shift();){d=e[d]||(e[d]=
{});var f=d.tail||(d.tail=d.next={});f.callback=b;f.context=c;d.tail=f.next={}}return this},off:function(a,b,c){var d,e,f;if(a){if(e=this._callbacks)for(a=a.split(/\s+/);d=a.shift();)if(f=e[d],delete e[d],b&&f)for(;(f=f.next)&&f.next;)if(!(f.callback===b&&(!c||f.context===c)))this.on(d,f.callback,f.context)}else delete this._callbacks;return this},trigger:function(a){var b,c,d,e;if(!(d=this._callbacks))return this;e=d.all;for((a=a.split(/\s+/)).push(null);b=a.shift();)e&&a.push({next:e.next,tail:e.tail,
event:b}),(c=d[b])&&a.push({next:c.next,tail:c.tail});for(e=s.call(arguments,1);c=a.pop();){b=c.tail;for(d=c.event?[c.event].concat(e):e;(c=c.next)!==b;)c.callback.apply(c.context||this,d)}return this}};g.Events.bind=g.Events.on;g.Events.unbind=g.Events.off;g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=j(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");if(!this.set(a,
{silent:!0}))throw Error("Can't create an invalid model");delete this._changed;this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(g.Model.prototype,g.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.attributes[a];return this._escapedAttributes[a]=f.escape(null==b?"":""+b)},has:function(a){return null!=
this.attributes[a]},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof g.Model&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=this.attributes,k=this._escapedAttributes,n=this._previousAttributes||{},h=this._setting;this._changed||(this._changed={});this._setting=!0;for(e in d)if(a=d[e],f.isEqual(b[e],a)||delete k[e],c.unset?delete b[e]:b[e]=
a,this._changing&&!f.isEqual(this._changed[e],a)&&(this.trigger("change:"+e,this,a,c),this._moreChanges=!0),delete this._changed[e],!f.isEqual(n[e],a)||f.has(b,e)!=f.has(n,e))this._changed[e]=a;h||(!c.silent&&this.hasChanged()&&this.change(c),this._setting=!1);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,
e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};c.wait&&(e=f.clone(this.attributes));a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var k=this,h=c.success;c.success=function(a,b,e){b=k.parse(a,e);c.wait&&(b=f.extend(d||{},b));if(!k.set(b,c))return!1;h?h(k,a):k.trigger("sync",k,a,c)};c.error=g.wrapError(c.error,
k,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d();a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=j(this.collection,"url")||j(this,"urlRoot")||o();return this.isNew()?
a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){if(this._changing||!this.hasChanged())return this;this._moreChanges=this._changing=!0;for(var b in this._changed)this.trigger("change:"+b,this,this._changed[b],a);for(;this._moreChanges;)this._moreChanges=!1,this.trigger("change",this,a);this._previousAttributes=f.clone(this.attributes);
delete this._changed;this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this._changed):this._changed&&f.has(this._changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this._changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},
isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});g.Collection=function(a,b){b||(b={});b.comparator&&(this.comparator=b.comparator);this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(g.Collection.prototype,g.Events,{model:g.Model,initialize:function(){},
toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){var c,d,e,g,h,i={},j={};b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");if(i[g=e.cid]||this._byCid[g]||null!=(h=e.id)&&(j[h]||this._byId[h]))throw Error("Can't add the same model to a collection twice");i[g]=j[h]=e}for(c=0;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=
e.id&&(this._byId[e.id]=e);this.length+=d;t.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;for(c=0,d=this.models.length;c<d;c++)if(i[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,
1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},get:function(a){return null==a?null:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",
this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,{silent:!0,parse:b.parse});b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,
b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){a instanceof g.Model?a.collection||
(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),
function(a){g.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)};var u=/:\w+/g,v=/\*\w+/g,w=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(g.Router.prototype,g.Events,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new g.History);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=
this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(w,"\\$&").replace(u,"([^/]+)").replace(v,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,
b){return a.exec(b).slice(1)}});g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var m=/^[#\/]/,x=/msie [\w.]+/,l=!1;f.extend(g.History.prototype,g.Events,{interval:50,getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=window.location.hash;a=decodeURIComponent(a);a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(m,"")},start:function(a){if(l)throw Error("Backbone.history has already been started");
this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=x.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?h(window).bind("popstate",
this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?h(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval));this.fragment=a;l=!0;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&
(this.fragment=a.hash.replace(m,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){h(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);l=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));
if(a==this.fragment||a==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!l)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(m,"");this.fragment==c||this.fragment==decodeURIComponent(c)||(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=
this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.iframe.location.hash)&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,
"")+"#"+b):a.hash=b}});g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var y=/^(\S+)\s*(.*)$/,p="model,collection,el,id,attributes,className,tagName".split(",");f.extend(g.View.prototype,g.Events,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);
b&&h(a).attr(b);c&&h(a).html(c);return a},setElement:function(a,b){this.$el=h(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=j(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(y),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+
this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=p.length;b<c;b++){var d=p[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var a=j(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});g.Model.extend=g.Collection.extend=g.Router.extend=g.View.extend=function(a,b){var c=z(this,a,b);c.extend=this.extend;return c};
var A={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=A[a],e={type:d,dataType:"json"};c.url||(e.url=j(b,"url")||o());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",
d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return h.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var q=function(){},z=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);q.prototype=a.prototype;d.prototype=new q;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},j=function(a,b){return!a||!a[b]?
null:f.isFunction(a[b])?a[b]():a[b]},o=function(){throw Error('A "url" property or function must be specified');}}).call(this);
/**
 * Lawnchair!
 * --- 
 * clientside json store 
 *
 */
/**
 * Lawnchair!
 * --- 
 * clientside json store 
 *
 */
var Lawnchair = function (options, callback) {
    // ensure Lawnchair was called as a constructor
    if (!(this instanceof Lawnchair)) return new Lawnchair(options, callback);

    // lawnchair requires json 
    if (!JSON) throw 'JSON unavailable! Include http://www.json.org/json2.js to fix.'
    // options are optional; callback is not
    if (arguments.length <= 2) {
        callback = (typeof arguments[0] === 'function') ? arguments[0] : arguments[1];
        options  = (typeof arguments[0] === 'function') ? {} : arguments[0] || {};
    } else {
        throw 'Incorrect # of ctor args!'
    }
    
    // default configuration 
    this.record = options.record || 'record'  // default for records
    this.name   = options.name   || 'records' // default name for underlying store
    
    // mixin first valid  adapter
    var adapter
    // if the adapter is passed in we try to load that only
    if (options.adapter) {
        
        // the argument passed should be an array of prefered adapters
        // if it is not, we convert it
        if(typeof(options.adapter) === 'string'){
            options.adapter = [options.adapter];    
        }
            
        // iterates over the array of passed adapters 
        for(var j = 0, k = options.adapter.length; j < k; j++){
            
            // itirates over the array of available adapters
            for (var i = Lawnchair.adapters.length-1; i >= 0; i--) {
                if (Lawnchair.adapters[i].adapter === options.adapter[j]) {
                    adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i] : undefined;
                    if (adapter) break 
                }
            }
            if (adapter) break
        }
    
    // otherwise find the first valid adapter for this env
    } 
    else {
        for (var i = 0, l = Lawnchair.adapters.length; i < l; i++) {
            adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i] : undefined
            if (adapter) break 
        }
    } 
    
    // we have failed 
    if (!adapter) throw 'No valid adapter.' 
    
    // yay! mixin the adapter 
    for (var j in adapter)  
        this[j] = adapter[j]
    
    // call init for each mixed in plugin
    for (var i = 0, l = Lawnchair.plugins.length; i < l; i++) 
        Lawnchair.plugins[i].call(this)

    // init the adapter 
    this.init(options, callback)
}

Lawnchair.adapters = [] 

/** 
 * queues an adapter for mixin
 * ===
 * - ensures an adapter conforms to a specific interface
 *
 */
Lawnchair.adapter = function (id, obj) {
    // add the adapter id to the adapter obj
    // ugly here for a  cleaner dsl for implementing adapters
    obj['adapter'] = id
    // methods required to implement a lawnchair adapter 
    var implementing = 'adapter valid init keys save batch get exists all remove nuke'.split(' ')
    ,   indexOf = this.prototype.indexOf
    // mix in the adapter   
    for (var i in obj) {
        if (indexOf(implementing, i) === -1) throw 'Invalid adapter! Nonstandard method: ' + i
    }
    // if we made it this far the adapter interface is valid 
	// insert the new adapter as the preferred adapter
	Lawnchair.adapters.splice(0,0,obj)
}

Lawnchair.plugins = []

/**
 * generic shallow extension for plugins
 * ===
 * - if an init method is found it registers it to be called when the lawnchair is inited 
 * - yes we could use hasOwnProp but nobody here is an asshole
 */ 
Lawnchair.plugin = function (obj) {
    for (var i in obj) 
        i === 'init' ? Lawnchair.plugins.push(obj[i]) : this.prototype[i] = obj[i]
}

/**
 * helpers
 *
 */
Lawnchair.prototype = {

    isArray: Array.isArray || function(o) { return Object.prototype.toString.call(o) === '[object Array]' },
    
    /**
     * this code exists for ie8... for more background see:
     * http://www.flickr.com/photos/westcoastlogic/5955365742/in/photostream
     */
    indexOf: function(ary, item, i, l) {
        if (ary.indexOf) return ary.indexOf(item)
        for (i = 0, l = ary.length; i < l; i++) if (ary[i] === item) return i
        return -1
    },

    // awesome shorthand callbacks as strings. this is shameless theft from dojo.
    lambda: function (callback) {
        return this.fn(this.record, callback)
    },

    // first stab at named parameters for terse callbacks; dojo: first != best // ;D
    fn: function (name, callback) {
        return typeof callback == 'string' ? new Function(name, callback) : callback
    },

    // returns a unique identifier (by way of Backbone.localStorage.js)
    // TODO investigate smaller UUIDs to cut on storage cost
    uuid: function () {
        var S4 = function () {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    // a classic iterator
    each: function (callback) {
        var cb = this.lambda(callback)
        // iterate from chain
        if (this.__results) {
            for (var i = 0, l = this.__results.length; i < l; i++) cb.call(this, this.__results[i], i) 
        }  
        // otherwise iterate the entire collection 
        else {
            this.all(function(r) {
                for (var i = 0, l = r.length; i < l; i++) cb.call(this, r[i], i)
            })
        }
        return this
    }
// --
};

/**
 * Expose nodeJS module
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Lawnchair;
}
Lawnchair.adapter('webkit-sqlite', (function () {
    // private methods 
    var fail = function (e, i) { console.error('error in sqlite adaptor!', e, i) }
    ,   now  = function () { return new Date() } // FIXME need to use better date fn
	// not entirely sure if this is needed...
    if (!Function.prototype.bind) {
        Function.prototype.bind = function( obj ) {
            var slice = [].slice
            ,   args  = slice.call(arguments, 1) 
            ,   self  = this
            ,   nop   = function () {} 
            ,   bound = function () {
                    return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments))) 
                }
            nop.prototype   = self.prototype
            bound.prototype = new nop()
            return bound
        }
    }

    // public methods
    return {
    
        valid: function() { return !!(window.openDatabase) },

        init: function (options, callback) {
            var that   = this
            ,   cb     = that.fn(that.name, callback)
            ,   create = "CREATE TABLE IF NOT EXISTS " + this.record + " (id NVARCHAR(32) UNIQUE PRIMARY KEY, value TEXT, timestamp REAL)"
            ,   win    = function(){ if(cb) return cb.call(that, that); }

            if (cb && typeof cb != 'function') throw 'callback not valid';

            // open a connection and create the db if it doesn't exist 
            this.db = openDatabase(this.name, '1.0.0', this.name, 65536)
            this.db.transaction(function (t) { 
                t.executeSql(create, []) 
            }, fail, win)
        }, 

        keys:  function (callback) {
            var cb   = this.lambda(callback)
            ,   that = this
            ,   keys = "SELECT id FROM " + this.record + " ORDER BY timestamp DESC"

            this.db.readTransaction(function(t) {
                var win = function (xxx, results) {
                    if (results.rows.length == 0 ) {
                        cb.call(that, [])
                    } else {
                        var r = [];
                        for (var i = 0, l = results.rows.length; i < l; i++) {
                            r.push(results.rows.item(i).id);
                        }
                        cb.call(that, r)
                    }
                }
                t.executeSql(keys, [], win, fail)
            })
            return this
        },
        // you think thats air you're breathing now?
        save: function (obj, callback, error) {
          var that = this
          ,   objs = (this.isArray(obj) ? obj : [obj]).map(function(o){if(!o.key) { o.key = that.uuid()} return o})
          ,   ins  = "INSERT OR REPLACE INTO " + this.record + " (value, timestamp, id) VALUES (?,?,?)"
          ,   win  = function () { if (callback) { that.lambda(callback).call(that, that.isArray(obj)?objs:objs[0]) }}
          ,   error= error || function() {}
          ,   insvals = []
          ,   ts = now()

          try {
            for (var i = 0, l = objs.length; i < l; i++) {
              insvals[i] = [JSON.stringify(objs[i]), ts, objs[i].key];
            }
          } catch (e) {
            fail(e)
            throw e;
          }

			 that.db.transaction(function(t) {
            for (var i = 0, l = objs.length; i < l; i++)
              t.executeSql(ins, insvals[i])
			 }, function(e,i){fail(e,i)}, win)

          return this
        }, 


        batch: function (objs, callback) {
          return this.save(objs, callback)
        },

        get: function (keyOrArray, cb) {
			var that = this
			,   sql  = ''
            ,   args = this.isArray(keyOrArray) ? keyOrArray : [keyOrArray];
            // batch selects support
            sql = 'SELECT id, value FROM ' + this.record + " WHERE id IN (" +
                args.map(function(){return '?'}).join(",") + ")"
			// FIXME
            // will always loop the results but cleans it up if not a batch return at the end..
			// in other words, this could be faster
			var win = function (xxx, results) {
				var o
				,   r
                ,   lookup = {}
                // map from results to keys
				for (var i = 0, l = results.rows.length; i < l; i++) {
					o = JSON.parse(results.rows.item(i).value)
					o.key = results.rows.item(i).id
                    lookup[o.key] = o;
				}
                r = args.map(function(key) { return lookup[key]; });
				if (!that.isArray(keyOrArray)) r = r.length ? r[0] : null
				if (cb) that.lambda(cb).call(that, r)
            }
            this.db.readTransaction(function(t){ t.executeSql(sql, args, win, fail) })
            return this 
		},

		exists: function (key, cb) {
			var is = "SELECT * FROM " + this.record + " WHERE id = ?"
			,   that = this
			,   win = function(xxx, results) { if (cb) that.fn('exists', cb).call(that, (results.rows.length > 0)) }
			this.db.readTransaction(function(t){ t.executeSql(is, [key], win, fail) })
			return this
		},

		all: function (callback) {
			var that = this
			,   all  = "SELECT * FROM " + this.record
			,   r    = []
			,   cb   = this.fn(this.name, callback) || undefined
			,   win  = function (xxx, results) {
				if (results.rows.length != 0) {
					for (var i = 0, l = results.rows.length; i < l; i++) {
						var obj = JSON.parse(results.rows.item(i).value)
						obj.key = results.rows.item(i).id
						r.push(obj)
					}
				}
				if (cb) cb.call(that, r)
			}

			this.db.readTransaction(function (t) { 
				t.executeSql(all, [], win, fail) 
			})
			return this
		},

		remove: function (keyOrArray, cb) {
			var that = this
                        ,   args
			,   sql  = "DELETE FROM " + this.record + " WHERE id "
			,   win  = function () { if (cb) that.lambda(cb).call(that) }
                        if (!this.isArray(keyOrArray)) {
                            sql += '= ?';
                            args = [keyOrArray];
                        } else {
                            args = keyOrArray;
                            sql += "IN (" +
                                args.map(function(){return '?'}).join(',') +
                                ")";
                        }
                        args = args.map(function(obj) {
                            return obj.key ? obj.key : obj;
                        });

			this.db.transaction( function (t) {
			    t.executeSql(sql, args, win, fail);
			});

			return this;
		},

		nuke: function (cb) {
			var nuke = "DELETE FROM " + this.record
			,   that = this
			,   win  = cb ? function() { that.lambda(cb).call(that) } : function(){}
				this.db.transaction(function (t) { 
				t.executeSql(nuke, [], win, fail) 
			})
			return this
		}
//////
}})());
/**
 * chrome.storage storage adapter 
 * === 
 * - originally authored by Joseph Pecoraro
 *
 */ 
//
// Oh, what a tangled web we weave when a callback is what we use to receive - jrschifa
//
Lawnchair.adapter('chrome-storage', (function() {
    var storage = chrome.storage.local

    var indexer = function(name) {
        return {
            // the key
            key: name + '._index_',
            // returns the index
            all: function(callback) {
                var _this = this

                var initStorage = function() {
                    var obj = JSON.stringify([])
                    var _set = {}
                    _set[_this.key] = obj
                    storage.set(_set)

                    obj = JSON.parse(obj)

                    return obj
                }

                storage.get(this.key, function(items) {
                    var obj
                    if (Object.keys(items).length > 0) {
                        for (itemKey in items) {
                            obj = items[itemKey]
                            if (obj) {
                                obj = JSON.parse(obj)
                            }

                            if (obj === null || typeof obj === 'undefined') {
                                obj = initStorage()
                            } 
                            
                            if (callback) {
                                callback(obj)
                            }
                        }
                    } else {
                        obj = initStorage()
                        callback(obj)
                    }
                })
            },
            // adds a key to the index
            add: function (key) {
                this.all(function(a) {
                    a.push(key)
                
                    var _set = {}
                    _set[this.key] = JSON.stringify(a)
                    storage.set(_set)
                })  
            },
            // deletes a key from the index
            del: function (key) {
                var r = []
                this.all(function(a) {    
                    for (var i = 0, l = a.length; i < l; i++) {
                        if (a[i] != key) r.push(a[i])
                    } 

                    var _set = {}
                    _set[this.key] = JSON.stringify(r) 
                    storage.set(_set)
                })
            },
            // returns index for a key
            find: function (key, callback) {
                this.all(function(a) {
                    for (var i = 0, l = a.length; i < l; i++) {
                        if (key === a[i]) {
                            if (callback) callback(i)
                        } 
                    }
                    
                    if (callback) callback(false)
                })    
            }
        }
    }
    
    // adapter api 
    return {
    
        // ensure we are in an env with chrome.storage 
        valid: function () {
            return !!storage && function() {
                // in mobile safari if safe browsing is enabled, window.storage
                // is defined but setItem calls throw exceptions.
                var success = true
                var value = Math.random()
                value = "" + value + "" //ensure that we are dealing with a string
                try {
                    var _set = {}
                    _set[value] = value;
                    storage.set(_set)
                } catch (e) {
                    success = false
                }
                storage.remove(value)
                return success
            }()
        },

        init: function (options, callback) {
            this.indexer = indexer(this.name)
            if (callback) this.fn(this.name, callback).call(this, this)  
        },
        
        save: function (obj, callback) {
            var key = obj.key ? this.name + '.' + obj.key : this.name + '.' + this.uuid()
            // if the key is not in the index push it on
            if (this.indexer.find(key) === false) this.indexer.add(key)
            // now we kil the key and use it in the store colleciton    
            delete obj.key;
            var _set = {}
            _set[key] = JSON.stringify(obj)
            storage.set(_set)
            obj.key = key.slice(this.name.length + 1)
            if (callback) {
                this.lambda(callback).call(this, obj)
            }
            return this
        },

        batch: function (ary, callback) {
            var saved = []
            // not particularily efficient but this is more for sqlite situations
            for (var i = 0, l = ary.length; i < l; i++) {
                this.save(ary[i], function(r){
                    saved.push(r)
                })
            }
            if (callback) this.lambda(callback).call(this, saved)
            return this
        },
       
        // accepts [options], callback
        keys: function(callback) {
            if (callback) { 
                var _this = this
                var name = this.name
                var keys

                this.indexer.all(function(data) {
                    keys = data.map(function(r) {
                       return r.replace(name + '.', '')   
                    })

                    _this.fn('keys', callback).call(_this, keys)
                })
            }
            return this
        },
        
        get: function (key, callback) {
            var _this = this
            var obj

            if (this.isArray(key)) {
                var r = []
                for (var i = 0, l = key.length; i < l; i++) {
                    var k = this.name + '.' + key[i]

                    storage.get(k, function(items) {
                        if (items) {
                            for (itemKey in items) {
                                obj = items[itemKey]
                                obj = JSON.parse(obj)
                                obj.key = itemKey.replace(_this.name + '.', '')
                                r.push(obj)
                            }
                        }

                        if (i == l) {
                            if (callback) _this.lambda(callback).call(_this, r)
                        }
                    })
                }
            } else {
                var k = this.name + '.' + key
                
                storage.get(k, function(items) {
                    if (items) {
                        for (itemKey in items) {
                            obj = items[itemKey]
                            obj = JSON.parse(obj)
                            obj.key = itemKey.replace(_this.name + '.', '')
                        }
                    }  
                    if (callback) _this.lambda(callback).call(_this, obj)
                })        
            }
            return this
        },

        exists: function (key, callback) {
            var _this = this
            this.indexer.find((this.name+'.'+key), function(response) {
                response = (response === false) ? false : true;
                _this.lambda(callback).call(_this, response)            
            })
            
            return this;
        },
        // NOTE adapters cannot set this.__results but plugins do
        // this probably should be reviewed
        all: function (callback) {
            var _this = this

            this.indexer.all(function(idx) {
                //console.log('adapter all');
                //console.log(idx);
                var r = []
                ,   o
                ,   k

                //console.log(idx);
                if (idx.length > 0) {
                    for (var i = 0, l = idx.length; i < l; i++) {
                        storage.get(idx[i], function(items) {
                            for (k in items) {
                                o = JSON.parse(items[k])
                                o.key = k.replace(_this.name + '.', '')
                                r.push(o)
                            }

                            if (i == l) {
                                if (callback) _this.fn(_this.name, callback).call(_this, r)
                            } 
                        })
                    }
                } else {
                    if (callback) _this.fn(_this.name, callback).call(_this, r)
                }    
            })
            return this  
        },
        
        remove: function (keyOrObj, callback) {
            var key = this.name + '.' + ((keyOrObj.key) ? keyOrObj.key : keyOrObj)
            this.indexer.del(key)
            storage.remove(key)
            if (callback) this.lambda(callback).call(this)
            return this
        },
        
        nuke: function (callback) {
            //could probably just use storage.clear() hear
            this.all(function(r) {
                for (var i = 0, l = r.length; i < l; i++) {
                    r[i] = "" + r[i] + ""
                    this.remove(r[i]);
                }
                if (callback) this.lambda(callback).call(this)
            })
            return this 
        }
}})());
/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-alert.js, bootstrap-button.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this;if(this.isShown)return;a("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");!b.$element.parent().length&&b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();if(!this.isShown)return;var e=this;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.trigger("hide").removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.remove(),e.trigger("closed")}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),e.trigger("close"),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype={constructor:b,setState:function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},toggle:function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")}},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){a(b.target).button("toggle")})})}(window.jQuery); //<== MUST put a semicolon here because twitter bootstrap is written by a bunch of smelly hipsters
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,!1);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,!1);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/**
* Jath is free software provided under the MIT license.
*  See LICENSE file for full text of the license.
*  Copyright 2010 Dan Newcome.
*/
(function(){function f(a,b,c){c===void 0&&(c=b);if(h(a)==="array"){var e=[];if(a[0]!=null)if(g=="msie"){b.setProperty("SelectionLanguage","XPath");for(var c=c.selectNodes(a[0]),d;d=c.nextNode();)e.push(f(a[1],b,d))}else if(g=="node"){c=c.find(a[0]);for(d=0;d<c.length;d++)e.push(f(a[1],b,c[d]))}else for(c=b.evaluate(a[0],c,Jath.resolver,XPathResult.ANY_TYPE,null);d=c.iterateNext();)e.push(f(a[1],b,d));else for(d=1;d<a.length;d++)e.push(f(a[d],b,c));a=e}else if(h(a)==="object"){d={};for(e in a)d[e]=
f(a[e],b,c);a=d}else e=c,g=="msie"?(b.setProperty("SelectionLanguage","XPath"),a=h(a)=="string"&&a.substring(0,1)!=Jath.literalChar?e.selectSingleNode(a).text:a.substring(1)):g=="node"?(require("sys").puts(a),a=e.get(a).text()):a=h(a)=="string"&&a[0]!=Jath.literalChar?b.evaluate(a,e,Jath.resolver,XPathResult.STRING_TYPE,null).stringValue:a.substring(1);return a}function h(a){var b=typeof a;b==="object"&&(a?typeof a.length==="number"&&!a.propertyIsEnumerable("length")&&typeof a.splice==="function"&&
(b="array"):b="null");return b}Jath={};Jath.parse=f;Jath.resolver=null;Jath.literalChar=":";var g;typeof WScript!="undefined"?g="msie":typeof process!="undefined"?(g="node",require("libxmljs"),exports.parse=f):g=navigator.userAgent.toLowerCase().indexOf("msie")>-1?"msie":"standards"})();

/*
 * An URI datatype.  Based upon examples in RFC3986.
 *
 * TODO %-escaping
 * TODO split apart authority
 * TODO split apart query_string (on demand, anyway)
 *
 * @(#) $Id$
 */

function URI(b){b||(b="");b=b.match(/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/);this.scheme=b[1]||null;this.authority=b[2]||null;this.path=b[3]||null;this.query=b[4]||null;this.fragment=b[5]||null}URI.prototype.toString=function(){var b="";this.scheme&&(b+=this.scheme+":");this.authority&&(b+="//"+this.authority);this.path&&(b+=this.path);this.query&&(b+="?"+this.query);this.fragment&&(b+="#"+this.fragment);return b};
(function(){function b(a){if(!a)return"";a=a.replace(/\/\.\//g,"/");for(a=a.replace(/\/\.$/,"/");a.match(e);)a=a.replace(e,"/");for(a=a.replace(/\/([^\/]*)\/\.\.$/,"/");a.match(/\/\.\.\//);)a=a.replace(/\/\.\.\//,"/");return a}var e=/\/((?!\.\.\/)[^\/]*)\/\.\.\//;URI.prototype.resolve=function(a){var c=new URI;if(this.scheme)c.scheme=this.scheme,c.authority=this.authority,c.path=b(this.path),c.query=this.query;else{if(this.authority)c.authority=this.authority,c.path=b(this.path),c.query=this.query;
else{if(this.path){if(this.path.charAt(0)==="/")c.path=b(this.path);else{var d;d=this.path;var e=/^(.*)\//;d=a.authority&&!a.path?"/"+d:a.path.match(e)[0]+d;c.path=d;c.path=b(c.path)}c.query=this.query}else c.path=a.path,c.query=this.query?this.query:a.query;c.authority=a.authority}c.scheme=a.scheme}c.fragment=this.fragment;return c}})();
 

// ZipFile.complete.js
//
// Tue 05/10/2011
//
// =======================================================
//

// JSIO.core.js
//
// core methods for Javascript IO.
//
// by Dino Chiesa
//
// Tue, 19 Jan 2010  17:44
//
// Licensed under the Ms-PL, see
// the accompanying License.txt file
//
(function(){if(typeof JSIO=="object"){var d=Error("JSIO is already defined");d.source="JSIO.core.js";throw d;}JSIO={version:"1.3 2011May10",decimalToHexString:function(c,e){c<0&&(c=4294967295+c+1);var b=c.toString(16).toUpperCase();e&&(b="00000000"+b,b=b.substring(b.length-e));return b},FileType:{Text:0,Binary:1,XML:2,Unknown:3}};JSIO.guessFileType=function(c){if(c=="makefile")return JSIO.FileType.Text;if(c=="mimetype")return JSIO.FileType.Text;var e=c.lastIndexOf(".");if(e<=0)return JSIO.FileType.Unknown;
c=c.substring(e);return c==".zip"?JSIO.FileType.Binary:c==".xlsx"?JSIO.FileType.Binary:c==".docx"?JSIO.FileType.Binary:c==".dll"?JSIO.FileType.Binary:c==".obj"?JSIO.FileType.Binary:c==".pdb"?JSIO.FileType.Binary:c==".exe"?JSIO.FileType.Binary:c==".xml"?JSIO.FileType.XML:c==".xsl"?JSIO.FileType.XML:c==".csproj"?JSIO.FileType.XML:c==".vbproj"?JSIO.FileType.XML:c==".shfbproj"?JSIO.FileType.XML:c==".resx"?JSIO.FileType.XML:c==".xslt"?JSIO.FileType.XML:c==".sln"?JSIO.FileType.Text:c==".htm"?JSIO.FileType.Text:
c==".html"?JSIO.FileType.Text:c==".js"?JSIO.FileType.Text:c==".vb"?JSIO.FileType.Text:c==".txt"?JSIO.FileType.Text:c==".rels"?JSIO.FileType.Text:c==".css"?JSIO.FileType.Text:c==".cs"?JSIO.FileType.Text:c==".ncx"?JSIO.FileType.Text:c==".xhtml"?JSIO.FileType.Text:c==".opf"?JSIO.FileType.Text:JSIO.FileType.Unknown};JSIO.stringOfLength=function(c,e){for(var b="",a=0;a<e;a++)b+=String.fromCharCode(c);return b};JSIO.formatByteArray=function(c){for(var e="0000  ",b="",a=0;a<c.length;a++)a!==0&&a%16===0&&
(e+="    "+b+"\n"+JSIO.decimalToHexString(a,4)+"  ",b=""),e+=JSIO.decimalToHexString(c[a],2)+" ",b+=c[a]>=32&&c[a]<=126?String.fromCharCode(c[a]):".";b.length>0&&(e+=JSIO.stringOfLength(32,(a%16>0?(16-a%16)*3:0)+4)+b);return e};JSIO.htmlEscape=function(c){return c.replace(RegExp("&","g"),"&amp;").replace(RegExp("<","g"),"&lt;").replace(RegExp(">","g"),"&gt;").replace(RegExp("\u0013","g"),"<br/>").replace(RegExp("\u0010","g"),"<br/>")}})();
(function(){typeof JSIO!=="object"&&(JSIO={});if(typeof JSIO.version!=="string")JSIO.version="1.3 2011May10";else if(JSIO.version.length<3||JSIO.version.substring(0,3)!=="1.3")JSIO.version+=" 1.3 2011May10";var d=function(){this.position=0};d.prototype.readToEnd=function(){for(var b=[],a=this.readByte();a!==null;)b.push(a),a=this.readByte();return b};d.prototype.beginReadToEnd=function(b){var a=[],e=this,c=function(){for(var d=0,f=e.readByte();f!==null;){a.push(f);d++;if(d>=1024)break;f=e.readByte()}f!==
null?typeof setTimeout=="undefined"?c():setTimeout(c,1):b(a)};c();return null};d.prototype.readBytes=function(b){for(var a=[],e=0;e<b;++e)a.push(this.readByte());return a};d.prototype.beginReadBytes=function(b,a){var e=[],c=this,d=b,f=function(){for(var b=0,j=c.readByte();d>0&&j!==null;){e.push(j);b++;d--;if(b>=1024)break;j=c.readByte()}d>0&&j!==null?setTimeout(f,1):a(e)};f();return null};JSIO._ByteReaderBase=d;d=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");
a.source="JSIO.ArrayReader";throw a;}this.position=0;this.array=b;this._typename="JSIO.ArrayReader";this._version="1.3 2011May10";return this};d.prototype=new JSIO._ByteReaderBase;d.prototype.readByte=function(){if(this.position>=this.array.length)return null;var b=this.array[this.position];this.position++;return b};var c=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="JSIO.StreamReader";throw a;}if(!b)throw a=Error("you must pass a non-null stream."),
a.source="JSIO.StreamReader",a;this.stream=b;this.position=0;this._typeName="JSIO.StreamReader";this._version="1.3 2011May10";this.length=b.getLength();return this};c.prototype=new JSIO._ByteReaderBase;c.prototype.readByte=function(){if(this.position>=this.length)return null;var b=this.stream.readByteAt(this.position);this.position++;return b};var e=function(b,a,e){if(!(this instanceof arguments.callee)){var c=Error("you must use new to instantiate this class");c.source="JSIO.StreamSegmentReader";
throw c;}if(!b)throw c=Error("you must pass a non-null stream."),c.source="JSIO.StreamSegmentReader",c;this.stream=b;this.position=a||0;this.limit=e?a+e:0;this._typeName="JSIO.StreamSegmentReader";this._version="1.3 2011May10";return this};e.prototype=new JSIO._ByteReaderBase;e.prototype.readByte=function(){if(this.limit!==0&&this.position>=this.limit)return null;var b=this.stream.readByteAt(this.position);this.position++;return b};JSIO.ArrayReader=d;JSIO.StreamReader=c;JSIO.StreamSegmentReader=e})();
(function(){if(typeof JSIO!=="object"||typeof JSIO.version!=="string"||JSIO.version.length<3||JSIO.version.substring(0,3)!=="1.3"){var d=Error("This extension requires JSIO.core.js v1.3");d.source="JSIO.BinaryUrlStream.js";throw d;}if(typeof JSIO._ByteReaderBase!=="function")throw d=Error("This class requires JSIO.BasicByteReaders.js"),d.source="JSIO.BinaryUrlStream.js",d;/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)&&document.write("<\!-- IEBinaryToArray_ByteStr --\>\r\n<script type='text/vbscript'>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n           IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n           IEBinaryToArray_ByteStr_Last = \"\"\r\n   End If\r\nEnd Function\r\n<\/script>\r\n");
var c=function(e,b,a){switch(e){case 1:e=Error('Failed to load "'+b+'"');break;case 2:e=Error("Error: EOF reached");break;case 3:e=Error("Error: cannot instantiate XMLHttpRequest");break;case 4:e=Error("Error: cannot seek");break;default:e=Error("Unknown Error.")}if(a)e.message=a;e.source="JSIO.BinaryUrlStream";throw e;},d=function(e,b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="JSIO.BinaryUrlStream.ctor";throw a;}this.callback=b;this.readByteAt=
null;this.fileSize=-1;this.filePointer=0;this.req=null;this._typename="JSIO.BinaryUrlStream";this._version="1.3 2011May10";this.status="-none-";var a=function(b){var a=this,e=function(b){for(var a={},e=0;e<256;e++)for(var p=0;p<256;p++)a[String.fromCharCode(e+p*256)]=String.fromCharCode(e)+String.fromCharCode(p);e=IEBinaryToArray_ByteStr(b);b=IEBinaryToArray_ByteStr_Last(b);return e.replace(/[\s\S]/g,function(b){return a[b]})+b};this.req=function(){if(window.XMLHttpRequest)return new window.XMLHttpRequest;
else try{return new ActiveXObject("MSXML2.XMLHTTP")}catch(b){return null}}();this.req.open("GET",b,!0);this.req.setRequestHeader("Accept-Charset","x-user-defined");this.req.onreadystatechange=function(){if(a.req.readyState==4)if(a.status="Status: "+a.req.status,a.req.status==200){var d=e(a.req.responseBody);a.fileSize=d.length-1;a.fileSize<0&&c(1,b,"after converting");a.readByteAt=function(b){return d.charCodeAt(b)&255};typeof a.callback=="function"&&a.callback(a)}else c(1,b,"http status code "+a.req.status)};
this.req.send()},d=function(b){var a=this;this.req=new XMLHttpRequest;this.req.open("GET",b,!0);this.req.onreadystatechange=function(){if(a.req.readyState==4)if(a.status="Status: "+a.req.status,a.req.status==200){var e=a.req.responseText;a.fileSize=e.length;a.readByteAt=function(b){return e.charCodeAt(b)&255};typeof a.callback=="function"&&a.callback(a)}else c(1,b)};this.req.overrideMimeType("text/plain; charset=x-user-defined");this.req.send(null)};/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)?
a.apply(this,[e]):d.apply(this,[e])};JSIO.SeekOrigin={Current:1,Begin:2};d.prototype=new JSIO._ByteReaderBase;d.prototype.getLength=function(){return this.fileSize};d.prototype.getPosition=function(){return this.filePointer};d.prototype.seek=function(e,b,a){typeof a!="undefined"&&a.verbose>1&&a.status.push("INFO: Seek "+e+" bytes, origin("+b+") start(0x"+JSIO.decimalToHexString(this.filePointer)+"/"+this.filePointer+")");switch(b){case JSIO.SeekOrigin.Current:this.seek(this.filePointer+e,JSIO.SeekOrigin.Begin);
break;case JSIO.SeekOrigin.Begin:e<0?this.filePointer=0:e>this.getLength()?c(2):this.filePointer=e;break;default:c(4)}typeof a!="undefined"&&a.verbose>1&&a.status.push("INFO: Seek end(0x"+JSIO.decimalToHexString(this.filePointer)+"/"+this.filePointer+")");return this.filePointer};d.prototype.read=function(e){if(e===0)return[];if(e<0)throw e=Error("invalid read length."),e.source="BinaryUrlStream.read()",e;for(var b=this.filePointer,a=[],c=b;c<b+e;c++)a.push(this.readByteAt(c));this.filePointer+=e;
return a};d.prototype.readByte=function(){var e=this.read(1);return e.length==1?e[0]:null};d.prototype.beginRead=function(e,b){e===0&&b(0);if(e<0){var a=Error("invalid read length.");a.source="BinaryUrlStream.beginRead()";throw a;}var c=[],d=this,g=e,f=function(){for(var a=0,e=d.filePointer;g>0;)if(c.push(d.readByteAt(a+e)),a++,g--,a>=1024)break;d.filePointer+=a;g>0?setTimeout(f,1):b(c)};f();return null};d.prototype.readNumber=function(e,b){for(var a=e||1,c=b||this.filePointer,d=0,g=c+a;g>c;g--)d=
d*256+this.readByteAt(g-1);this.filePointer=c+a;return d};d.prototype.readString=function(e,b){for(var a=e||1,c=b||this.filePointer,d="",g=c+a;c<g;c++)d+=String.fromCharCode(this.readByteAt(c));this.filePointer+=a;return d};d.prototype.readNullTerminatedString=function(e){for(var e=e||this.filePointer,b="",a="",c=0,d=String.fromCharCode(this.readByteAt(e+c));d!==null;)a+=d,c++,c>=1024&&(b+=a,a="",e+=c,this.filePointer+=c,c=0),d=String.fromCharCode(this.readByteAt(e+c));this.filePointer=e+c;return b+
a};d.prototype.beginReadNullTerminatedString=function(e,b){var a=b||this.filePointer,c="",d="",g=this,f=function(){for(var b=0,j=String.fromCharCode(g.readByteAt(a+b));j!==null;){d+=j;b++;if(b>=1024){c+=d;d="";a+=b;g.filePointer+=b;b=0;break}j=String.fromCharCodet(g.readByteAt(i))}g.filePointer=a+b;j!==null?setTimeout(f,1):e(c+d)};f();return null};JSIO.BinaryUrlStream=d})();
(function(){if(typeof JSIO!=="object"||typeof JSIO.version!=="string"){var d=Error("This extension requires JSIO.core.js v1.3");d.source="JSIO.TextDecoder.js";throw d;}if(JSIO.version.length<3||JSIO.version.substring(0,3)!=="1.3")throw d=Error("This extension requires JSIO.core.js v1.3"),d.source="JSIO.TextDecoder.js",d;if(typeof JSIO._ByteReaderBase!=="function")throw d=Error("This class requires JSIO.BasicByteReaders.js"),d.source="JSIO.TextDecoder.js",d;d=function(b){if(!(this instanceof arguments.callee)){var a=
Error("you must use new to instantiate this class");a.source="JSIO.TextDecoder.Default.ctor";throw a;}this.byteReader=b;this._version="1.3 2011May10";this._typename="JSIO.TextDecoder.Default";return this};d.prototype.readChar=function(){var b=this.byteReader.readByte();return b<0?null:String.fromCharCode(b)};var c=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="JSIO.TextDecoder.Utf16.ctor";throw a;}this.byteReader=b;this.bomState=
0;this._version="1.3 2011May10";this._typename="JSIO.TextDecoder.Utf16";return this};c.prototype.readChar=function(){var b=this.byteReader.readByte();if(b<0)return null;var a=this.byteReader.readByte();if(a<0)throw b=Error("Incomplete UTF16 character"),b.source="JSIO.TextDecoder.Utf16.readChar()",b;if(this.bomState===0&&b+a==509){this.bomState=a==254?1:2;b=this.byteReader.readByte();if(b<0)return null;a=this.byteReader.readByte();if(a<0)throw b=Error("Incomplete UTF16 character"),b.source="JSIO.TextDecoder.Utf16.readChar()",
b;}else this.bomState=1;return String.fromCharCode(this.bomState==1?a<<8|b:b<<8|a)};var e=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="JSIO.TextDecoder.Utf8.ctor";throw a;}this.byteReader=b;this.waitBom=!0;this.strict=!1;this.pendingChar=null;this._version="1.3 2011May10";this._typename="JSIO.TextDecoder.Utf8";return this};e.prototype.readChar=function(){var b=null;do{if(this.pendingChar!==null)b=this.pendingChar,this.pendingChar=
null;else{var a=this.byteReader.readByte();if(a===null)return null;if((a&128)===0)b=String.fromCharCode(a);else{var e=192,b=5;do{if((a&(e>>1|128))==e)break;e=e>>1|128;--b}while(b>=0);if(b>0){a&=(1<<b)-1;for(e=5;e>=b;--e){var c=this.byteReader.readByte();if((c&192)!=128)throw b=Error("Invalid sequence character"),b.source=this._typename+".readChar",b;a=a<<6|c&63}a<=65535?b=a==65279&&this.waitBom?null:String.fromCharCode(a):(b=a-65536,a=55296|b>>10&1023,this.pendingChar=String.fromCharCode(56320|b&
1023),b=String.fromCharCode(a))}else if(this.strict)throw b=Error("Invalid character"),b.source=this._typename+".readChar",b;else b=String.fromCharCode(a)}}this.waitBom=!1}while(b===null);return b};JSIO.TextDecoder={Default:d,Utf16:c,Utf8:e}})();
(function(){if(typeof JSIO.TextDecoder.Utf8!=="function"){var d=Error("This class requires JSIO.TextDecoder.js");d.source="JSIO.TextReader.js";throw d;}d=function(c){if(!(this instanceof arguments.callee)){var e=Error("you must use new to instantiate this class");e.source="JSIO.TextReader.ctor";throw e;}this.decoder=c;this._version="1.3 2011May10";this._typename="JSIO.TextReader";this.unreads=[]};d.prototype.readChar=function(){return this.unreads.length>0?this.unreads.pop():this.decoder.readChar()};
d.prototype.read=function(c){var e="";for(vari=0;i<c;i++){var b=this.readChar();b!==null?e+=b:i=c}return e};d.prototype.unreadChar=function(c){this.unreads.push(c)};d.prototype.readToEnd=function(){for(var c="",e="",b=0,a=this.readChar();a!==null;)e+=a,b++,b>=1024&&(c+=e,e="",b=0),a=this.readChar();return c+e};d.prototype.beginReadToEnd=function(c){var e="",b="",a=this,d=function(){for(var m=0,g=a.readChar();g!==null;){b+=g;m++;if(m>=1024){e+=b;b="";break}g=a.readChar()}g!==null?setTimeout(d,1):c(e+
b)};d();return null};d.prototype.readLine=function(){var c="",e=this.readChar();if(e===null)return null;for(;e!="\r"&&e!="\n";)if(c+=e,e=this.readChar(),e===null)return c;e=="\r"&&(e=this.readChar(),e!==null&&e!="\n"&&this.unreadChar(e));return c};JSIO.TextReader=d})();
(function(){if(typeof JSIO._ByteReaderBase!=="function"){var d=Error("This extension requires JSIO.BasicByteReaders.js");d.source="JSIO.Crc32.js";throw d;}JSIO.crc32Table=null;JSIO.crc32Polynomial=3988292384;var c=function(){if(!JSIO.crc32Table){JSIO.crc32Table=Array(256);for(var b=0;b<256;b++){for(var a=b,e=0;e<8;e++)a&1?a=JSIO.crc32Polynomial^a>>>1:a>>>=1;JSIO.crc32Table[b]=a}}};JSIO.computeCrc32=function(b){c();var a=4294967295,e=b.length;if(typeof b=="object")for(var d=0;d<e;d++)a=JSIO.crc32Table[a&
255^b[d]]^a>>>8;else for(d=0;d<e;d++)a=JSIO.crc32Table[a&255^b.charCodeAt(d)]^a>>>8;a^=4294967295;a<0&&(a+=4294967296);return a};d=function(){if(!(this instanceof arguments.callee)){var b=Error("you must use new to instantiate this class");b.source="JSIO.Crc32.ctor";throw b;}c();this._typename="JSIO.Crc32";this._version="1.3 2011May10";this._runningCrc32=4294967295};d.prototype.slurpByte=function(b){var a=this._runningCrc32;this._runningCrc32=a>>>8^JSIO.crc32Table[b^a&255]};d.prototype.result=function(){var b=
this._runningCrc32^4294967295;b<0&&(b+=4294967296);return b};var e=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="JSIO.Crc32Reader.ctor";throw a;}this._byteReader=b;this._typename="JSIO.Crc32Reader";this._version="1.3 2011May10";this._crc32=new JSIO.Crc32};e.prototype=new JSIO._ByteReaderBase;e.prototype.readByte=function(){var b=this._byteReader.readByte();b!==null&&this._crc32.slurpByte(b);return b};e.prototype.crc32=function(){return this._crc32.result()};
JSIO.Crc32=d;JSIO.Crc32Reader=e})();
(function(){if(typeof JSIO._ByteReaderBase!=="function"){var d=Error("This class requires JSIO.BasicByteReaders.js");d.source="JSIO.InflatingReader.js";throw d;}var c=function(b){if(!(this instanceof arguments.callee)){var a=Error("you must use new to instantiate this class");a.source="InflatingReader._InternalBitReader.ctor";throw a;}this.bits=this.bitsLength=0;this.byteReader=b;this._typeName="JSIO.InflatingReader._InternalBitReader";this._version="1.3 2011May10"};c.prototype.readBit=function(){if(this.bitsLength===
0){var b=this.byteReader.readByte();if(b===null)throw b=Error("Unexpected end of stream"),b.source=this._typeName+".readBit",b;this.bits=b;this.bitsLength=8}b=(this.bits&1)!==0;this.bits>>=1;--this.bitsLength;return b};c.prototype.align=function(){this.bitsLength=0};c.prototype.readLSB=function(b){for(var a=0,e=0;e<b;++e)this.readBit()&&(a|=1<<e);return a};c.prototype.readMSB=function(b){for(var a=0,e=0;e<b;++e)this.readBit()?a=a<<1|1:a<<=1;return a};var d=function(b){if(!(this instanceof arguments.callee)){var a=
Error("you must use new to instantiate this class");a.source="JSIO.InflatingReader.ctor";throw a;}this._byteReader=b;this._bitReader=new c(b);this._buffer=[];this._state=this._bufferPosition=0;this._blockFinal=!1;this._typeName="JSIO.InflatingReader";this._version="1.3 2011May10";return this},e=null,b=null,a=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],o=function(b){for(var a=0,e=Array(b.length),c=b[0],a=1;a<b.length;a++)c<b[a]&&(c=b[a]);for(var d=Array(c+1),a=0;a<=c;a++)d[a]=0;for(a=0;a<b.length;a++)++d[b[a]];
var f=Array(c+1),a=0;d[0]=0;for(var j=1;j<=c;j++)a=a+d[j-1]<<1,f[j]=a;for(a=0;a<e.length;a++)c=b[a],c!==0&&(e[a]=f[c],f[c]++);return e},m=function(b,a){for(var e=[],c=0;c<b.length;++c)if(a[c]>0){var d={};d.bits=b[c];d.length=a[c];d.index=c;e.push(d)}return g(e,0,0)},g=function(b,a,e){if(b.length===0)return null;for(var c=[],d=[],f={isLeaf:!1},j=0;j<b.length;++j)if(b[j].length==e&&b[j].bits==a){f.isLeaf=!0;f.index=b[j].index;break}else(b[j].bits>>b[j].length-e-1&1)>0?d.push(b[j]):c.push(b[j]);if(!f.isLeaf)f.zero=
g(c,a<<1,e+1),f.one=g(d,a<<1|1,e+1);return f},f=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],q=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],j=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],r=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];d.prototype=new JSIO._ByteReaderBase;d.prototype._decodeItem=function(){var c,d;if(this._state==2)return null;if(this._state===
0)switch(this._blockFinal=this._bitReader.readBit(),d=this._bitReader.readLSB(2),d){case 0:this._bitReader.align();var k=this._bitReader.readLSB(16);d=this._bitReader.readLSB(16);if((k&~d)!=k)throw d=Error("Invalid block type 0 length"),d.source="JSIO.InflatingReader._decodeItem",d;d={itemType:0};d.array=Array(k);for(c=0;c<k;++c){var g=this._byteReader.readByte();if(g<0)throw d=Error("Incomplete block"),d.source="JSIO.InflatingReader._decodeItem",d;d.array[c]=g}if(this._blockFinal)this._state=2;return d;
case 1:this._codesTree=e;this._distancesTree=b;this._state=1;break;case 2:c=this._bitReader;d=c.readLSB(5)+257;for(var k=c.readLSB(5)+1,l=c.readLSB(4)+4,g=Array(19),h=0,h=0;h<g.length;++h)g[h]=0;for(h=0;h<l;++h)g[a[h]]=c.readLSB(3);l=o(g);l=m(l,g);for(g=[];g.length<d+k;){for(h=l;!h.isLeaf;)h=c.readBit()?h.one:h.zero;h=h.index;if(h<=15)g.push(h);else if(h==16)for(var h=c.readLSB(2)+3,n=0;n<h;++n)g.push(g[g.length-1]);else if(h==17){h=c.readLSB(3)+3;for(n=0;n<h;++n)g.push(0)}else if(h==18){h=c.readLSB(7)+
11;for(n=0;n<h;++n)g.push(0)}}c=g.slice(0,d);l=o(c);d=g.slice(d,d+k);k=o(d);c=m(l,c);d=m(k,d);this._codesTree=c;this._distancesTree=d;this._state=1;break;default:throw d=Error("Invalid block type ("+d+")"),d.source="JSIO.InflatingReader._decodeItem",d;}d={};for(c=this._codesTree;!c.isLeaf;)c=this._bitReader.readBit()?c.one:c.zero;if(c.index<256)d.itemType=2,d.symbol=c.index;else if(c.index>256){c=c.index;if(c>285)throw d=Error("Invalid length code"),d.source="JSIO.InflatingReader._decodeItem",d;k=
f[c-257];q[c-257]>0&&(k+=this._bitReader.readLSB(q[c-257]));for(c=this._distancesTree;!c.isLeaf;)c=this._bitReader.readBit()?c.one:c.zero;c=c.index;g=j[c];r[c]>0&&(g+=this._bitReader.readLSB(r[c]));d.itemType=3;d.distance=g;d.length=k}else d.itemType=1,this._state=this._blockFinal?2:0;return d};d.prototype.readByte=function(){for(;this._bufferPosition>=this._buffer.length;){var b=this._decodeItem();if(b===null)return null;switch(b.itemType){case 0:this._buffer=this._buffer.concat(b.array);break;case 2:this._buffer.push(b.symbol);
break;case 3:for(var a=this._buffer.length-b.distance,c=0;c<b.length;c++)this._buffer.push(this._buffer[a++])}}b=this._buffer[this._bufferPosition++];if(this._bufferPosition>49152){a=this._buffer.length-32768;if(a>this._bufferPosition)a=this._bufferPosition;this._buffer.splice(0,a);this._bufferPosition-=a}this.position++;return b};(function(){for(var a=Array(288),c=Array(288),d=0,d=0;d<=143;d++)a[d]=48+d,c[d]=8;for(d=144;d<=255;d++)a[d]=400+d-144,c[d]=9;for(d=256;d<=279;d++)a[d]=0+d-256,c[d]=7;for(d=
280;d<=287;d++)a[d]=192+d-280,c[d]=8;e=m(a,c);a=Array(32);c=Array(32);for(d=0;d<=31;d++)a[d]=d,c[d]=5;b=m(a,c)})();JSIO.InflatingReader=d})();
(function(){function d(b){this.zipfile=b;this._typename="ZipEntry";this._version=c;this._crcCalculator=null}var c="1.26 2011Aug07";if(typeof JSIO.BinaryUrlStream!="function"){var e=Error("This extension requires JSIO.BinaryUrlStream.js v1.3");e.source="Zipfile.js";throw e;}if(typeof JSIO.TextDecoder!=="object")throw e=Error("This extension requires JSIO.TextDecoder.js"),e.source="Zipfile.js",e;if(typeof JSIO.TextReader!=="function")throw e=Error("This extension requires JSIO.TextReader.js"),e.source=
"Zipfile.js",e;if(typeof JSIO.Crc32!=="function")throw e=Error("This extension requires JSIO.Crc32.js"),e.source="Zipfile.js",e;if(typeof JSIO.InflatingReader!=="function")throw e=Error("This extension requires JSIO.InflatingReader.js"),e.source="Zipfile.js",e;d.prototype.extract=function(b,a){this.contentType=JSIO.guessFileType(this.name);var a=a||this.contentType==JSIO.FileType.Text||this.contentType==JSIO.FileType.XML,c=this;if(this.compressionMethod!==0&&this.compressionMethod!=8){var d=Error("Unsupported compression method: "+
this.compressionMethod);d.source="ZipEntry.extract()";throw d;}d=a?this.openTextReader():this.openBinaryReader();d.zipEntryName=c.name;if(typeof b!="function")return d=d.readToEnd(),this.verifyCrc32(),d;d.beginReadToEnd(function(a){try{c.verifyCrc32(),b(c,a)}catch(d){b(c,d)}});return null};d.prototype.openBinaryReader=function(){var b=new JSIO.StreamSegmentReader(this.zipfile.binaryStream,this.offset+this.lengthOfHeader,this.compressedSize);this.compressionMethod!==0&&(b=new JSIO.InflatingReader(b));
return this._crcCalculator=new JSIO.Crc32Reader(b)};d.prototype.openTextReader=function(b){var a=this.openBinaryReader(),b=b||JSIO.TextDecoder.Utf8,d=new b;b.apply(d,[a]);b=new JSIO.TextReader(d);return d._parent=b};d.prototype.verifyCrc32=function(){var b=this._crcCalculator.crc32(),a=!1;this.crc32!=b?this.zipfile.status.push("WARNING: CRC check failed: entry("+this.name+") computed("+JSIO.decimalToHexString(b,8)+") expected("+JSIO.decimalToHexString(this.crc32,8)+") "):(a=!0,this.zipfile.verbose>
2&&this.zipfile.status.push("INFO: CRC check ok: 0x"+JSIO.decimalToHexString(this.crc32,8)));return a};ZipFile=function(b,a,e){function m(){var b=f.binaryStream.getPosition(),a=f.binaryStream.readNumber(4);if(a==ZipFile.Signatures.DirEntry)return f.verbose>0&&f.status.push("INFO: at offset 0x"+JSIO.decimalToHexString(b)+", found start of Zip Directory."),null;if(a!=ZipFile.Signatures.Entry)return f.status.push("WARNING: at offset 0x"+JSIO.decimalToHexString(b)+", found unexpected signature: 0x"+JSIO.decimalToHexString(a)),
null;var c=new d(f);c.offset=b;c.versionNeeded=f.binaryStream.readNumber(2);c.bitField=f.binaryStream.readNumber(2);c.compressionMethod=f.binaryStream.readNumber(2);var a=f.binaryStream.readNumber(4),e;if(a==65535||a===0)e=new Date(1995,0,1,0,0,0,0);else{var g=a&65535,k=(a&4294901760)>>16,a=1980+((k&65024)>>9),b=((k&480)>>5)-1;k&=31;var m=(g&63488)>>11,l=(g&2016)>>5,g=(g&31)*2;g>=60&&(l++,g=0);l>=60&&(m++,l=0);m>=24&&(k++,m=0);var h=!1;try{e=new Date(a,b,k,m,l,g,0),h=!0}catch(n){if(a==1980&&(b===
0||k===0))try{e=new Date(1980,0,1,m,l,g,0),h=!0}catch(o){try{e=new Date(1980,0,1,0,0,0,0),h=!0}catch(s){}}else try{for(;a<1980;)a++;for(;a>2030;)a--;for(;b<1;)b++;for(;b>12;)b--;for(;k<1;)k++;for(;k>28;)k--;for(;l<0;)l++;for(;l>59;)l--;for(;g<0;)g++;for(;g>59;)g--;e=new Date(a,b-1,k,m,l,g,0);h=!0}catch(t){}}if(!h)throw c=Error("bad date/time value in this zip file."),c.source="ZipFile.ReadZipEntry",c;}c.lastModified=e;if((c.bitField&1)==1)return f.status.push("This zipfile uses Encryption, which is not supported by ZipFile.js."),
null;c.utf8=(c.bitField&2048)==2048;c.usesTrailingDescriptor=(c.bitField&8)==8;c.crc32=f.binaryStream.readNumber(4);c.compressedSize=f.binaryStream.readNumber(4);c.uncompressedSize=f.binaryStream.readNumber(4);if(c.compressedSize==4294967295||c.uncompressedSize==4294967295)return f.status.push("This zipfile uses ZIP64, which is not supported by ZipFile.js"),null;a=f.binaryStream.readNumber(2);b=f.binaryStream.readNumber(2);f.status.push("INFO: filename length= "+a);e=30+a+b;c.utf8?(f.status.push("INFO: before filename, position= 0x"+
JSIO.decimalToHexString(f.binaryStream.getPosition())),g=new JSIO.StreamSegmentReader(f.binaryStream,f.binaryStream.getPosition(),a),g=new JSIO.TextDecoder.Utf8(g),g=new JSIO.TextReader(g),c.name=g.readToEnd(),f.binaryStream.seek(a,JSIO.SeekOrigin.Current,f),f.status.push("INFO: after filename, position= 0x"+JSIO.decimalToHexString(f.binaryStream.getPosition()))):c.name=f.binaryStream.readString(a);c.extra=f.binaryStream.read(b);f.verbose>1&&f.status.push("INFO: at offset 0x"+JSIO.decimalToHexString(c.offset)+
", found entry '"+c.name+"' fnl("+a+") efl("+b+")");b>0&&f.verbose>0&&f.status.push("INFO: entry "+c.name+" has "+b+" bytes of extra metadata (ignored)");a=0;if(c.usesTrailingDescriptor){b=f.binaryStream.getPosition();for(a=f.binaryStream.readNumber(4);a!=ZipFile.Signatures.DataDescriptor;)f.binaryStream.seek(-3,JSIO.SeekOrigin.Current),a=f.binaryStream.readNumber(4);c.crc32=f.binaryStream.readNumber(4);c.compressedSize=f.binaryStream.readNumber(4);c.uncompressedSize=f.binaryStream.readNumber(4);
a=16;f.binaryStream.seek(b,JSIO.SeekOrigin.Begin)}c.lengthOfHeader=e;c.totalEntrySize=c.lengthOfHeader+c.compressedSize;f.verbose>1&&f.status.push("INFO: seek 0x"+JSIO.decimalToHexString(c.compressedSize)+" ("+c.compressedSize+") bytes");f.binaryStream.seek(c.compressedSize+a,JSIO.SeekOrigin.Current,f);return c}if(!(this instanceof arguments.callee)){var g=Error("you must use new to instantiate this class");g.source="ZipFile.ctor";throw g;}this.verbose=e||0;this.entries=[];this.entryNames=[];this.status=
[];this._version=c;this._typename="ZipFile";var f=this;this.binaryStream=new JSIO.BinaryUrlStream(b,function(b){try{if(b.req.status==200)if(f.binaryStream.readNumber(4)!=ZipFile.Signatures.Entry)f.status.push("WARNING: this file does not appear to be a zip file");else{f.binaryStream.seek(0,JSIO.SeekOrigin.Begin);if(f.entryNames.length===0)for(var c;(c=m())!==null;)f.entries.push(c),f.entryNames.push(c.name);f.verbose>0&&f.status.push("INFO: read "+f.entries.length+" entries")}else f.status.push("ERROR: the URL could not be read ("+
b.req.status+" "+b.req.statusText+")");a(f)}catch(d){f.status.push("Exception: "+d.message),a(f)}});return this};ZipFile.Signatures={Entry:67324752,EndOfCentralDirectory:101010256,DirEntry:33639248,DataDescriptor:134695760};ZipFile.Version=c;ZipFile.EncryptionAlgorithm={None:0,PkzipWeak:1,WinZipAes:2}})();
/*
 * Crypto-JS v2.5.3
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto=="undefined"||!Crypto.util)&&function(){var d=window.Crypto={},m=d.util={rotl:function(a,c){return a<<c|a>>>32-c},rotr:function(a,c){return a<<32-c|a>>>c},endian:function(a){if(a.constructor==Number)return m.rotl(a,8)&16711935|m.rotl(a,24)&4278255360;for(var c=0;c<a.length;c++)a[c]=m.endian(a[c]);return a},randomBytes:function(a){for(var c=[];a>0;a--)c.push(Math.floor(Math.random()*256));return c},bytesToWords:function(a){for(var c=[],b=0,i=0;b<a.length;b++,i+=8)c[i>>>5]|=(a[b]&255)<<
24-i%32;return c},wordsToBytes:function(a){for(var c=[],b=0;b<a.length*32;b+=8)c.push(a[b>>>5]>>>24-b%32&255);return c},bytesToHex:function(a){for(var c=[],b=0;b<a.length;b++)c.push((a[b]>>>4).toString(16)),c.push((a[b]&15).toString(16));return c.join("")},hexToBytes:function(a){for(var c=[],b=0;b<a.length;b+=2)c.push(parseInt(a.substr(b,2),16));return c},bytesToBase64:function(a){if(typeof btoa=="function")return btoa(f.bytesToString(a));for(var c=[],b=0;b<a.length;b+=3)for(var i=a[b]<<16|a[b+1]<<
8|a[b+2],l=0;l<4;l++)b*8+l*6<=a.length*8?c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i>>>6*(3-l)&63)):c.push("=");return c.join("")},base64ToBytes:function(a){if(typeof atob=="function")return f.stringToBytes(atob(a));for(var a=a.replace(/[^A-Z0-9+\/]/ig,""),c=[],b=0,i=0;b<a.length;i=++b%4)i!=0&&c.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(b-1))&Math.pow(2,-2*i+8)-1)<<i*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(b))>>>
6-i*2);return c}},d=d.charenc={};d.UTF8={stringToBytes:function(a){return f.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(f.bytesToString(a)))}};var f=d.Binary={stringToBytes:function(a){for(var c=[],b=0;b<a.length;b++)c.push(a.charCodeAt(b)&255);return c},bytesToString:function(a){for(var c=[],b=0;b<a.length;b++)c.push(String.fromCharCode(a[b]));return c.join("")}}}();
(function(){var d=Crypto,m=d.util,f=d.charenc,a=f.UTF8,c=f.Binary,b=d.SHA1=function(a,l){var g=m.wordsToBytes(b._sha1(a));return l&&l.asBytes?g:l&&l.asString?c.bytesToString(g):m.bytesToHex(g)};b._sha1=function(b){b.constructor==String&&(b=a.stringToBytes(b));var c=m.bytesToWords(b),g=b.length*8,b=[],d=1732584193,h=-271733879,j=-1732584194,k=271733878,f=-1009589776;c[g>>5]|=128<<24-g%32;c[(g+64>>>9<<4)+15]=g;for(g=0;g<c.length;g+=16){for(var o=d,p=h,q=j,r=k,s=f,e=0;e<80;e++){if(e<16)b[e]=c[g+e];else{var n=
b[e-3]^b[e-8]^b[e-14]^b[e-16];b[e]=n<<1|n>>>31}n=(d<<5|d>>>27)+f+(b[e]>>>0)+(e<20?(h&j|~h&k)+1518500249:e<40?(h^j^k)+1859775393:e<60?(h&j|h&k|j&k)-1894007588:(h^j^k)-899497514);f=k;k=j;j=h<<30|h>>>2;h=d;d=n}d+=o;h+=p;j+=q;k+=r;f+=s}return[d,h,j,k,f]};b._blocksize=16;b._digestsize=20})();
/*
 * Handlebars runtime v0.1.0beta6
 */
 var Handlebars={VERSION:"1.0.beta.6",helpers:{},partials:{},registerHelper:function(a,b,c){if(c)b.not=c;this.helpers[a]=b},registerPartial:function(a,b){this.partials[a]=b}};Handlebars.registerHelper("helperMissing",function(a){if(arguments.length!==2)throw Error("Could not find property '"+a+"'");});var toString=Object.prototype.toString,functionType="[object Function]";
Handlebars.registerHelper("blockHelperMissing",function(a,b){var c=b.inverse||function(){},d=b.fn,f="",e=toString.call(a);e===functionType&&(a=a.call(this));if(a===!0)return d(this);else if(a===!1||a==null)return c(this);else if(e==="[object Array]"){if(a.length>0){c=0;for(e=a.length;c<e;c++)f+=d(a[c])}else f=c(this);return f}else return d(a)});Handlebars.registerHelper("each",function(a,b){var c=b.fn,d=b.inverse,f="";if(a&&a.length>0)for(var d=0,e=a.length;d<e;d++)f+=c(a[d]);else f=d(this);return f});
Handlebars.registerHelper("if",function(a,b){toString.call(a)===functionType&&(a=a.call(this));return!a||Handlebars.Utils.isEmpty(a)?b.inverse(this):b.fn(this)});Handlebars.registerHelper("unless",function(a,b){var c=b.fn;b.fn=b.inverse;b.inverse=c;return Handlebars.helpers["if"].call(this,a,b)});Handlebars.registerHelper("with",function(a,b){return b.fn(a)});Handlebars.registerHelper("log",function(a){Handlebars.log(a)});
Handlebars.Exception=function(a){var b=Error.prototype.constructor.apply(this,arguments),c;for(c in b)b.hasOwnProperty(c)&&(this[c]=b[c]);this.message=b.message};Handlebars.Exception.prototype=Error();Handlebars.SafeString=function(a){this.string=a};Handlebars.SafeString.prototype.toString=function(){return this.string.toString()};
(function(){var a={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},b=/&(?!\w+;)|[<>"'`]/g,c=/[&<>"'`]/,d=function(b){return a[b]||"&amp;"};Handlebars.Utils={escapeExpression:function(a){if(a instanceof Handlebars.SafeString)return a.toString();else if(a==null||a===!1)return"";return!c.test(a)?a:a.replace(b,d)},isEmpty:function(a){return typeof a==="undefined"?!0:a===null?!0:a===!1?!0:Object.prototype.toString.call(a)==="[object Array]"&&a.length===0?!0:!1}}})();
Handlebars.VM={template:function(a){var b={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(a,b,f){var e=this.programs[a];return f?Handlebars.VM.program(b,f):(e||(e=this.programs[a]=Handlebars.VM.program(b)),e)},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop};return function(c,d){d=d||{};return a.call(b,Handlebars,c,d.helpers,d.partials,d.data)}},programWithDepth:function(a,b,c){var d=Array.prototype.slice.call(arguments,
2);return function(c,e){e=e||{};return a.apply(this,[c,e.data||b].concat(d))}},program:function(a,b){return function(c,d){d=d||{};return a(c,d.data||b)}},noop:function(){return""},invokePartial:function(a,b,c,d,f,e){options={helpers:d,partials:f,data:e};if(a===void 0)throw new Handlebars.Exception("The partial "+b+" could not be found");else if(a instanceof Function)return a(c,options);else if(Handlebars.compile)return f[b]=Handlebars.compile(a),f[b](c,options);else throw new Handlebars.Exception("The partial "+
b+" could not be compiled when running in runtime-only mode");}};Handlebars.template=Handlebars.VM.template;

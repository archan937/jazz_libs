if (typeof(FooBar) == "undefined") {

// *
// * FooBar.js v0.0.1 (Uncompressed)
// * No need for other Javascript libraries anymore! ;)
// *
// * (c) 2011 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, FooBar.js is licensed under
// * http://creativecommons.org/licenses/by/3.0
// *
// * $Date: 2011-10-19 22:35:40 +0200 (Wed, 19 October 2011) $
// *

FooBar = (function() {
  var css  = '<style>#bx{top:50%;left:50%;position:absolute;z-index:999999}#bx.hidden{top:0 !important;left:0 !important;opacity:0 !important;-moz-opacity:0 !important;-khtml-opacity:0 !important;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0) !important;z-index:-1982 !important}#bx .bx_content{top:-50%;left:-50%;padding:6px 12px 8px 12px;overflow:hidden;position:relative;background:#fbf7aa;border-width:10px;border-style:solid;border-color:#f9e98e;*border-width:7px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;box-shadow:rgba(0,0,0,0.1) 0 1px 3px;-moz-box-shadow:rgba(0,0,0,0.1) 0 1px 3px;-webkit-box-shadow:rgba(0,0,0,0.1) 0 1px 3px}#bx .bx_content,#bx .bx_content a{color:#a27d35}#bx .bx_content a{outline:0}</style>';
  var html = '<div id="bx" class="hidden"><div class="bx_content"></div></div>';

  var bind = function() {
    $("body").mousedown(function(event) {
      var target = $(event.target);
      if (target.closest("#bx").length == 0) {
        jQuery("#bx").addClass("hidden");
      }
    });
  };

  var injectCode = function() {
    if (!jQuery("head").length) {
      jQuery(document.body).before("<head></head>");
    }
    jQuery(css).prependTo("head");
    jQuery(html).appendTo("body");
  };

  var sayHi = function() {
    var hi = "Hi, my name is FooBar.js and I am jQuery (" + jQuery.fn.jquery + ") based!<br>Also, my CSS is compiled with SASS!";
    // alert(hi);
    jQuery("#bx").find(".bx_content").html(hi).end().removeClass("hidden");
  };

  return {
    version: "0.0.1",
    init: function() {
      jQuery(function() {
        bind();
        injectCode();
        if (typeof(onFooBarReady) == "function") {
          onFooBarReady();
        };
      });
    },
    sayHi: sayHi
  };
}());

(function requireMissingLibs() {
  var missing_libs = [];

  if (typeof(jQuery) == "undefined") {
    missing_libs.push("core");
  }

  if (missing_libs.length == 0) {
    FooBar.init();
  } else {
    var id = "_dummy_script_";
    document.write('<script id="' + id + '"></script>');

    var dummyScript = document.getElementById(id);
    var element     = dummyScript.previousSibling;
    while (element && element.tagName.toLowerCase() != "script") {
      element = element.previousSibling;
    }
    dummyScript.parentNode.removeChild(dummyScript);

    var src = element.getAttribute("src").replace(/(\w+)(\-min)?\.js.*$/, "jquery/" + missing_libs.sort().join(".") + ".js");
    document.write('<script src="' + src + '" type="text/javascript" ' +
                           'onload="FooBar.init()" onreadystatechange="FooBar.init()">' +
                   '</script>');
  }
}());

/* Implement indexOf ourselves as IE does not support it */

Array.indexOf || (Array.prototype.indexOf = function(v) {
  for (var i = this.length; i-- && this[i] != v;);
  return i;
});

}

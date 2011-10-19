if (typeof(<%= class_name %>) == "undefined") {

// *
// * <%= name %> v{version} (Uncompressed)
// * <%= small_description %>
// *
// * (c) {year} <%= author %> <%= "(#{company})" unless company.empty? %>
// * Except otherwise noted, <%= name %> is licensed under
// * http://creativecommons.org/licenses/by/3.0
// *
// * $Date: {date} $
// *

<%= class_name %> = (function() {
  var css  = '<style>{style}</style>';
  var html = '<div id="bx" class="hidden"><div class="bx_content"></div></div>';

  var injectCode = function() {
    if (!jQuery("head").length) {
      jQuery(document.body).before("<head></head>");
    }
    jQuery(css).prependTo("head");
    jQuery(html).appendTo("body");
  };

  var sayHi = function() {
    var hi = "Hi, my name is <%= name %><%= ' and I am jQuery (" + jQuery.fn.jquery + ") based' if jquery %>!";
    // alert(hi);
    jQuery("#bx").find(".bx_content").html(hi).end().show();
  };

  return {
    version: "{version}",
    init: function() {
      jQuery(function() {
        injectCode();
        if (typeof(on<%= class_name %>Ready) == "function") {
          on<%= class_name %>Ready();
        };
      });
    },
    sayHi: sayHi
  };
}());

<%- if jquery -%>
(function requireMissingLibs() {
  var missing_libs = [];

  if (typeof(jQuery) == "undefined") {
    missing_libs.push("core");
  }

  if (missing_libs.length == 0) {
    <%= class_name %>.init();
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
                           'onload="<%= class_name %>.init()" onreadystatechange="<%= class_name %>.init()">' +
                   '</script>');
  }
}());
<%- else -%>
<%= class_name %>.init();
<%- end -%>

/* Implement indexOf ourselves as IE does not support it */

Array.indexOf || (Array.prototype.indexOf = function(v) {
  for (var i = this.length; i-- && this[i] != v;);
  return i;
});

}
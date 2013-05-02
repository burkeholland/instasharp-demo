(function() {

  define(['jquery', 'kendo', 'text!mylibs/layout/views/template.html'], function($, kendo, template) {
    var layout;
    return layout = new kendo.Layout(template);
  });

}).call(this);

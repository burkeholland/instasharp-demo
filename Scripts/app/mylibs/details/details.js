(function() {

  define(['jQuery', 'kendo', 'text!mylibs/details/views/details-template.html'], function($, kendo, template) {
    var view;
    view = null;
    return {
      init: function(url) {
        if (view === null) {
          return view = new kendo.View(template, {
            model: viewModel
          });
        } else {
          return view;
        }
      }
    };
  });

}).call(this);

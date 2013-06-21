(function() {

  define(["jquery", "kendo", "mylibs/common/feed/feed", "text!mylibs/feed/views/template.html"], function(jquery, kendo, Feed, template) {
    var view;
    view = null;
    return {
      init: function(url) {
        var Timeline;
        if (view === null) {
          Timeline = new Feed(url);
          return view = new kendo.View(template, {
            model: Timeline.viewModel,
            init: Timeline.viewModel.ds.read()
          });
        } else {
          return view;
        }
      }
    };
  });

}).call(this);

(function() {

  define(["jquery", "kendo", "mylibs/common/feed/feed", "text!mylibs/self/views/template.html"], function(jquery, kendo, Feed, template) {
    var Timeline, view;
    Timeline = new Feed("api/users/recent");
    return view = new kendo.View(template, {
      model: Timeline.viewModel,
      init: Timeline.viewModel.ds.read()
    });
  });

}).call(this);

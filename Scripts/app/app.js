(function() {

  define(['jquery', 'kendo', 'mylibs/layout/layout', 'mylibs/feed/feed', 'mylibs/self/self'], function($, kendo, layout, feed, self) {
    var app, currentView;
    currentView = null;
    app = new kendo.Router({
      init: function() {
        return layout.render('#application');
      }
    });
    app.route('/', function() {
      return layout.showIn('#content', feed);
    });
    app.route('/self', function() {
      return layout.showIn('#content', self);
    });
    return app.start();
  });

}).call(this);

(function() {

  define(['jquery', 'kendo', 'mylibs/layout/layout', 'mylibs/feed/feed', 'mylibs/self/self', 'mylibs/realtime/realtime', 'mylibs/users/users'], function($, kendo, layout, feed, self, realtime, users) {
    var app, container;
    container = "#content";
    app = new kendo.Router({
      init: function() {
        return layout.render('#application');
      }
    });
    app.route('/', function() {
      return layout.showIn(container, feed.init("api/self/feed"));
    });
    app.route('/self', function() {
      return layout.showIn(container, self.init("api/self/recent"));
    });
    app.route('/users/:id', function(id) {
      layout.showIn(container, users.init("api/users/", id));
      return users.get(id);
    });
    return app.start();
  });

}).call(this);

(function() {

  define(['jQuery', 'kendo'], function($, kendo) {
    var pub;
    return pub = {
      get: function(id) {
        return $.get("users/recent/" + id, function(data) {});
      }
    };
  });

}).call(this);

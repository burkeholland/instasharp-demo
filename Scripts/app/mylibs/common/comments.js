(function() {

  define(["jquery", "kendo"], function($, kendo) {
    return {
      post: function(mediaId, comment) {
        var defrd;
        defrd = new $.Deferred();
        $.post("api/media/" + mediaId + "/comment", {
          text: comment
        }, function(data) {
          return defrd.resolve(data);
        });
        return defrd;
      },
      destroy: function(commentId) {
        var defrd;
        defrd = new $.Deferred();
        $.post("api/media/" + commentId + "/comment/delete", function(data) {
          return derfd.resolve(data);
        });
        return defrd;
      }
    };
  });

}).call(this);

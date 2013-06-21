(function() {

  define(["jquery", "kendo", "signalr", "/signalr/hubs"], function($, kendo, signalr, hubs) {
    var realtime;
    realtime = $.connection.realtimeHub;
    realtime.client.broadcastMessage = function(message) {
      return console.log(message);
    };
    return $.connection.hub.start({
      waitForPageLoad: false
    });
  });

}).call(this);

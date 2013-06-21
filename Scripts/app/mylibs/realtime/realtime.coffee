define [
    "jquery"
    "kendo"
    "signalr"
    "/signalr/hubs"
], ($, kendo, signalr, hubs) ->

    realtime = $.connection.realtimeHub

    realtime.client.broadcastMessage = (message) ->
        console.log message
    
    $.connection.hub.start({ waitForPageLoad: false })
    

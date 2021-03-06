﻿(function() {

  require.config({
    paths: {
      jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
      kendo: 'libs/kendo/kendo',
      bootstrap: '../bootstrap.min',
      signalr: '../jquery.signalR-1.0.1.min'
    },
    shim: {
      'kendo': {
        deps: ['jquery'],
        exports: 'kendo'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'signalr': {
        deps: ['jquery']
      },
      '/signalr/hubs': ['jquery', 'signalr']
    }
  });

  require(['jquery', 'kendo', 'bootstrap', 'app'], function(app) {});

}).call(this);

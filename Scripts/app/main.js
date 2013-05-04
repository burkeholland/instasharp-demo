(function() {

  require.config({
    paths: {
      jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
      kendo: ['libs/kendo/kendo', '../kendo/2013.1.319/kendo.core.min'],
      bootstrap: '../bootstrap.min'
    },
    shim: {
      'kendo': {
        deps: ['jquery'],
        exports: 'kendo'
      },
      'bootstrap': {
        deps: ['jquery']
      }
    }
  });

  require(['jquery', 'kendo', 'bootstrap', 'app'], function(app) {});

}).call(this);

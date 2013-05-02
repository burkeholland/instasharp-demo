# CoffeeScript
define [
    'jquery',
    'kendo',
    'mylibs/layout/layout'
    'mylibs/feed/feed'
    'mylibs/self/self'
], ($, kendo, layout, feed, self) ->

    # create a new router and initialize the layout
    app = new kendo.Router 
        init: -> layout.render '#application'

    # define the routes
    app.route '/', ->
        layout.showIn '#content', feed

    app.route '/self', ->
        layout.showIn '#content', self

    app.start()
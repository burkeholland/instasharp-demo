# CoffeeScript
define [
    'jquery',
    'kendo',
    'mylibs/layout/layout'
    'mylibs/feed/feed'
    'mylibs/self/self'
    'mylibs/realtime/realtime'
    'mylibs/users/users'
], ($, kendo, layout, feed, self, realtime, users) ->

    # define the container for the views
    container = "#content"

    # create a new router and initialize the layout
    app = new kendo.Router 
        init: -> layout.render '#application'

    # define the routes
    app.route '/', ->
        layout.showIn container, feed.init "api/self/feed"

    app.route '/self', ->
        layout.showIn container, self.init "api/self/recent"

    app.route '/users/:id', (id) ->
        layout.showIn container, users.init "api/users/", id
        users.get id

    app.start()

    